import { Product, Farm, SubscriptionPlan, UserSubscription, Order, UserProfile, ContactSubmission } from '../types';
import { INITIAL_PRODUCTS, INITIAL_FARMS, SUBSCRIPTION_PLANS, INITIAL_PAST_ORDERS, INITIAL_USER_PROFILE, INITIAL_USER_SUBSCRIPTION } from '../data/mockData';

// API Configuration for Django Backend
export interface ApiConfig {
  mode: 'mock' | 'django';
  baseUrl: string;
  authToken?: string;
}

const STORAGE_KEY = 'farmdirect_api_config';

export const getApiConfig = (): ApiConfig => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return {
    mode: 'mock',
    baseUrl: 'http://127.0.0.1:8000/api',
  };
};

export const saveApiConfig = (config: ApiConfig) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
};

// Django API Client
class FarmDirectApiClient {
  private config: ApiConfig;

  constructor() {
    this.config = getApiConfig();
  }

  public updateConfig(newConfig: Partial<ApiConfig>) {
    this.config = { ...this.config, ...newConfig };
    saveApiConfig(this.config);
  }

  public getConfig(): ApiConfig {
    return this.config;
  }

  public async checkDjangoHealth(): Promise<{ ok: boolean; status: number; message: string }> {
    try {
      const res = await fetch(`${this.config.baseUrl}/health/`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        return { ok: true, status: res.status, message: 'Django API server connected successfully!' };
      }
      return { ok: false, status: res.status, message: `Django returned status ${res.status}` };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Connection refused';
      return {
        ok: false,
        status: 0,
        message: `Could not reach ${this.config.baseUrl} (${errorMessage}). Ensure Django server is running and django-cors-headers is configured.`,
      };
    }
  }

  // Generic request with automatic mock fallback
  private async request<T>(endpoint: string, options: RequestInit = {}, fallbackData: T): Promise<T> {
    if (this.config.mode === 'mock') {
      return fallbackData;
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(this.config.authToken ? { 'Authorization': `Bearer ${this.config.authToken}` } : {}),
      };

      const res = await fetch(`${this.config.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...(options.headers as Record<string, string>),
        },
      });

      if (!res.ok) {
        console.warn(`[Django API] Error ${res.status} at ${endpoint}, using mock fallback`);
        return fallbackData;
      }

      return (await res.json()) as T;
    } catch (error) {
      console.warn(`[Django API] Request failed at ${endpoint}, falling back to mock data:`, error);
      return fallbackData;
    }
  }

  // Products
  public async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/products/', { method: 'GET' }, INITIAL_PRODUCTS);
  }

  public async getProductById(id: string): Promise<Product | undefined> {
    const fallback = INITIAL_PRODUCTS.find((p) => p.id === id);
    return this.request<Product>(`/products/${id}/`, { method: 'GET' }, fallback!);
  }

  // Farms
  public async getFarms(): Promise<Farm[]> {
    return this.request<Farm[]>('/farms/', { method: 'GET' }, INITIAL_FARMS);
  }

  public async getFarmById(id: string): Promise<Farm | undefined> {
    const fallback = INITIAL_FARMS.find((f) => f.id === id);
    return this.request<Farm>(`/farms/${id}/`, { method: 'GET' }, fallback!);
  }

  // Subscriptions
  public async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return this.request<SubscriptionPlan[]>('/subscription-plans/', { method: 'GET' }, SUBSCRIPTION_PLANS);
  }

  public async getUserSubscription(): Promise<UserSubscription> {
    return this.request<UserSubscription>('/subscriptions/current/', { method: 'GET' }, INITIAL_USER_SUBSCRIPTION);
  }

  public async pauseSubscription(pauseStart: string, pauseEnd: string): Promise<UserSubscription> {
    const updated = {
      ...INITIAL_USER_SUBSCRIPTION,
      status: 'Paused' as const,
      pauseStartDate: pauseStart,
      pauseEndDate: pauseEnd,
    };
    return this.request<UserSubscription>('/subscriptions/pause/', {
      method: 'POST',
      body: JSON.stringify({ pauseStartDate: pauseStart, pauseEndDate: pauseEnd }),
    }, updated);
  }

  public async resumeSubscription(): Promise<UserSubscription> {
    const updated = {
      ...INITIAL_USER_SUBSCRIPTION,
      status: 'Active' as const,
      pauseStartDate: undefined,
      pauseEndDate: undefined,
    };
    return this.request<UserSubscription>('/subscriptions/resume/', {
      method: 'POST',
    }, updated);
  }

  public async modifySubscription(data: Partial<UserSubscription>): Promise<UserSubscription> {
    const updated = {
      ...INITIAL_USER_SUBSCRIPTION,
      ...data,
    };
    return this.request<UserSubscription>('/subscriptions/modify/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, updated);
  }

  // Orders
  public async getPastOrders(): Promise<Order[]> {
    return this.request<Order[]>('/orders/', { method: 'GET' }, INITIAL_PAST_ORDERS);
  }

  public async createOrder(newOrder: Omit<Order, 'id' | 'orderNumber' | 'date'>): Promise<Order> {
    const created: Order = {
      ...newOrder,
      id: `ord-${Date.now()}`,
      orderNumber: `Order #${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    return this.request<Order>('/orders/', {
      method: 'POST',
      body: JSON.stringify(created),
    }, created);
  }

  // User Profile
  public async getUserProfile(): Promise<UserProfile> {
    return this.request<UserProfile>('/profile/', { method: 'GET' }, INITIAL_USER_PROFILE);
  }

  public async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const updated = {
      ...INITIAL_USER_PROFILE,
      ...data,
    };
    return this.request<UserProfile>('/profile/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, updated);
  }

  // Contact Form
  public async submitContactMessage(submission: ContactSubmission): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>('/contact/', {
      method: 'POST',
      body: JSON.stringify(submission),
    }, {
      success: true,
      message: 'Thank you! Your message has been received. Our farm support team will respond within 24 hours.',
    });
  }
}

export const api = new FarmDirectApiClient();

// Ready-to-copy Python Django snippets for the user!
export const DJANGO_CODE_SNIPPETS = {
  models: `# farmdirect/models.py
from django.db import models
from django.contrib.auth.models import User

class Farm(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    location = models.CharField(max_length=255)
    state = models.CharField(max_length=50)
    farmer_name = models.CharField(max_length=150)
    farmer_role = models.CharField(max_length=150)
    farmer_bio = models.TextField()
    story = models.TextField()
    acreage = models.PositiveIntegerField()
    established_year = models.PositiveIntegerField()
    practices = models.JSONField(default=list)
    certifications = models.JSONField(default=list)
    crops = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Vegetables', 'Vegetables'),
        ('Fruits', 'Fruits'),
        ('Dairy & Eggs', 'Dairy & Eggs'),
        ('Meat & Poultry', 'Meat & Poultry'),
        ('Bakery & Pantry', 'Bakery & Pantry'),
    ]
    farm = models.ForeignKey(Farm, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    unit = models.CharField(max_length=50) # e.g. "bunch", "lb", "dozen"
    description = models.TextField()
    organic = models.BooleanField(default=True)
    in_stock = models.BooleanField(default=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    reviews_count = models.PositiveIntegerField(default=0)
    origin = models.CharField(max_length=200)
    nutrition = models.JSONField(default=dict, blank=True)
    tags = models.JSONField(default=list, blank=True)
    image_category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - \${self.price}"

class Order(models.Model):
    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE, null=True, blank=True)
    order_number = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=50, default='Delivered')
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    product_name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    farm_name = models.CharField(max_length=200)
`,

  serializers: `# farmdirect/serializers.py
from rest_framework import serializers
from .models import Farm, Product, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    farm_name = serializers.ReadOnlyField(source='farm.name')
    farmId = serializers.ReadOnlyField(source='farm.id')

    class Meta:
        model = Product
        fields = '__all__'

class FarmSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Farm
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['productId', 'productName', 'price', 'quantity', 'unit', 'farmName']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'
`,

  views: `# farmdirect/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Farm, Product, Order
from .serializers import FarmSerializer, ProductSerializer, OrderSerializer

class FarmViewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = [permissions.AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category and category != 'All':
            queryset = queryset.filter(category=category)
        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

@api_view(['GET'])
def health_check(request):
    return Response({"status": "healthy", "service": "FarmDirect Django API"})
`,

  urls: `# farmdirect/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FarmViewSet, ProductViewSet, OrderViewSet, health_check

router = DefaultRouter()
router.register(r'farms', FarmViewSet, basename='farm')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/health/', health_check, name='health_check'),
]
`,

  cors_settings: `# settings.py (Add CORS so React can talk to Django)
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
    'farmdirect',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Put at top
    'django.middleware.common.CommonMiddleware',
    ...
]

# Allow React Dev frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_ALL_ORIGINS = True # Set True during local development
`,
};
