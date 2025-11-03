# 🏗️ Project Architecture

## 📋 Index

- [Architectural Principles](#architectural-principles)
- [Application Layers](#application-layers)
- [Design Patterns](#design-patterns)
- [State Management](#state-management)
- [Data Flow](#data-flow)
- [Practical Examples](#practical-examples)

## Architectural Principles

### 1. **Separation of Concerns**
Each module has a specific and well-defined responsibility.

```
📁 Presentation Layer    → UI Components & Pages
📁 Business Logic Layer → Custom Hooks & State Management  
📁 Data Access Layer    → API Services & Data Normalization
📁 Infrastructure Layer → Configuration & External Services
```

### 2. **Dependency Inversion**
High-level modules do not depend on low-level modules. Both depend on abstractions.

```typescript
// ❌ Bad - Direct dependency
const UserList = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);
  
  return <div>{/* render users */}</div>;
};

// ✅ Good - Dependency inversion
const UserList = () => {
  const { data: users, isLoading } = useUsers();
  
  if (isLoading) return <LoadingSpinner />;
  
  return <div>{/* render users */}</div>;
};
```

### 3. **Composition over Inheritance**
We favor component composition over inheritance.

```typescript
// ✅ Composition
const UserCard = ({ user, actions }) => (
  <Card>
    <UserAvatar user={user} />
    <UserInfo user={user} />
    <UserActions actions={actions} />
  </Card>
);

// Usage
<UserCard 
  user={user} 
  actions={<EditButton onClick={handleEdit} />} 
/>
```

## Application Layers

### **1. Presentation Layer (UI)**

**Responsibilities:**
- Component rendering
- User event handling
- Data presentation

**Structure:**
```
src/components/
├── ui/           # Base design system components
├── forms/        # Form components
├── layout/       # Layout components
└── common/       # Shared components

src/pages/        # Main application pages
```

**Example:**
```typescript
// src/components/ui/Button/Button.tsx
interface ButtonProps extends ChakraButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading,
  children,
  ...props
}) => {
  return (
    <ChakraButton
      isLoading={loading}
      colorScheme={getColorScheme(variant)}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};
```

### **2. Business Logic Layer**

**Responsibilities:**
- Business logic
- Validations
- Data transformations
- State management

**Structure:**
```
src/hooks/
├── api/          # API hooks
├── business/     # Business logic
└── ui/           # UI hooks

src/stores/       # Global state
├── slices/       # Zustand slices
└── machines/     # XState machines
```

**Example:**
```typescript
// src/hooks/business/useUserManagement.ts
export const useUserManagement = () => {
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  const handleCreateUser = useCallback(async (userData: CreateUserRequest) => {
    try {
      await createUser(userData);
      toast.success('User created successfully');
    } catch (error) {
      toast.error('Failed to create user');
    }
  }, [createUser]);

  return {
    createUser: handleCreateUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
  };
};
```

### **3. Data Access Layer**

**Responsibilities:**
- API communication
- Data normalization
- Cache management
- Error handling

**Structure:**
```
src/services/
├── api/          # API services
├── auth/         # Authentication services
└── storage/      # Storage management

src/types/        # Type definitions
├── api/          # API types
├── business/     # Domain types
└── ui/           # UI types
```

**Example:**
```typescript
// src/services/api/userService.ts
export const userService = {
  getAll: async (params?: GetUsersParams): Promise<NormalizedUsersResponse> => {
    const response = await apiClient.get<UsersResponse>('/users', { params });
    return {
      ...response.data,
      users: normalizeUsers(response.data.users),
    };
  },

  create: async (userData: CreateUserRequest): Promise<NormalizedUser> => {
    const response = await apiClient.post<User>('/users', userData);
    return normalizeUser(response.data);
  },
};

// Data normalization
export const normalizeUser = (user: User): NormalizedUser => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
  initials: `${user.firstName[0]}${user.lastName[0]}`.toUpperCase(),
  isAdmin: user.role === UserRole.ADMIN,
  createdAt: new Date(user.createdAt),
  updatedAt: new Date(user.updatedAt),
});
```

## Design Patterns

### **1. Container/Presentational Pattern**

```typescript
// Container Component (logic)
const UserListContainer: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();
  const { deleteUser } = useUserManagement();

  if (error) return <ErrorMessage error={error} />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <UserListPresentation 
      users={users} 
      onDeleteUser={deleteUser}
    />
  );
};

// Presentational Component (UI)
interface UserListPresentationProps {
  users: NormalizedUser[];
  onDeleteUser: (id: string) => void;
}

const UserListPresentation: React.FC<UserListPresentationProps> = ({
  users,
  onDeleteUser,
}) => (
  <SimpleGrid columns={2} spacing={4}>
    {users.map(user => (
      <UserCard 
        key={user.id} 
        user={user} 
        onDelete={() => onDeleteUser(user.id)}
      />
    ))}
  </SimpleGrid>
);
```

### **2. Custom Hook Pattern**

```typescript
// Composite hook that encapsulates complex logic
export const useUserForm = (userId?: string) => {
  const { data: user } = useUser(userId);
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user ? normalizeUserForForm(user) : defaultUserValues,
  });

  const onSubmit = useCallback(async (data: UserFormData) => {
    try {
      if (userId) {
        await updateUser({ id: userId, userData: data });
      } else {
        await createUser(data);
      }
      toast.success(`User ${userId ? 'updated' : 'created'} successfully`);
    } catch (error) {
      toast.error(`Failed to ${userId ? 'update' : 'create'} user`);
    }
  }, [userId, createUser, updateUser]);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: form.formState.isSubmitting,
  };
};
```

### **3. Error Boundary Pattern**

```typescript
// Error Boundary with different error types
export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    logErrorToService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.renderErrorFallback();
    }

    return this.props.children;
  }

  private renderErrorFallback() {
    const { error } = this.state;
    
    if (error?.name === 'ChunkLoadError') {
      return <ChunkLoadErrorFallback />;
    }
    
    if (error?.message?.includes('Network')) {
      return <NetworkErrorFallback />;
    }
    
    return <GenericErrorFallback error={error} />;
  }
}
```

## State Management

### **1. Local State (useState/useReducer)**
For component-specific state.

```typescript
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  
  // Component logic
};
```

### **2. Shared State (Context API)**
For state that needs to be shared between related components.

```typescript
// Context for page filters
const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  
  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const value = useMemo(() => ({
    filters,
    updateFilter,
    clearFilters: () => setFilters(defaultFilters),
  }), [filters, updateFilter]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};
```

### **3. Global State (Zustand)**
For state that needs to be accessed from multiple parts of the application.

```typescript
// Global store for user preferences
export const useUserPreferencesStore = create<UserPreferencesStore>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'light',
        language: 'en',
        notifications: true,
        
        setTheme: (theme) => set({ theme }),
        setLanguage: (language) => set({ language }),
        toggleNotifications: () => set(state => ({ 
          notifications: !state.notifications 
        })),
      }),
      { name: 'user-preferences' }
    )
  )
);
```

### **4. Complex State (XState)**
For complex state logic with multiple transitions.

```typescript
// State machine for checkout process
export const checkoutMachine = createMachine<CheckoutContext, CheckoutEvent>({
  id: 'checkout',
  initial: 'cart',
  context: {
    items: [],
    shippingInfo: null,
    paymentInfo: null,
    total: 0,
  },
  states: {
    cart: {
      on: {
        PROCEED_TO_SHIPPING: {
          target: 'shipping',
          cond: 'hasItems',
        },
      },
    },
    shipping: {
      on: {
        SUBMIT_SHIPPING: {
          target: 'payment',
          actions: 'saveShippingInfo',
        },
        BACK_TO_CART: 'cart',
      },
    },
    payment: {
      on: {
        SUBMIT_PAYMENT: {
          target: 'processing',
          actions: 'savePaymentInfo',
        },
        BACK_TO_SHIPPING: 'shipping',
      },
    },
    processing: {
      invoke: {
        id: 'processPayment',
        src: 'processPayment',
        onDone: 'success',
        onError: 'error',
      },
    },
    success: {
      type: 'final',
    },
    error: {
      on: {
        RETRY: 'payment',
      },
    },
  },
});
```

## Data Flow

### **1. Unidirectional Flow**

```
User Action → Event Handler → Business Logic → API Call → State Update → UI Re-render
```

### **2. Complete Example**

```typescript
// 1. User clicks button
const handleCreateUser = () => {
  // 2. Event handler calls business logic
  createUser(formData);
};

// 3. Business logic processes the action
const { mutate: createUser } = useMutation({
  mutationFn: userService.create,
  onSuccess: (newUser) => {
    // 4. Update cache/state
    queryClient.setQueryData(['users'], (old) => [...old, newUser]);
    // 5. Show feedback
    toast.success('User created successfully');
  },
  onError: (error) => {
    toast.error('Failed to create user');
  },
});

// 6. UI re-renders with new data
const { data: users } = useQuery(['users'], userService.getAll);
```

## Practical Examples

### **Example 1: Complete Feature - User Management**

```typescript
// 1. Types
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// 2. API Service
const userService = {
  getAll: () => apiClient.get<User[]>('/users'),
  create: (user: CreateUserRequest) => apiClient.post<User>('/users', user),
  update: (id: string, user: UpdateUserRequest) => 
    apiClient.put<User>(`/users/${id}`, user),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
};

// 3. Custom Hook
const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });
};

// 4. Business Logic Hook
const useUserManagement = () => {
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User created');
    },
  });

  return {
    createUser: createMutation.mutate,
    isCreating: createMutation.isLoading,
  };
};

// 5. Component
const UserManagement: React.FC = () => {
  const { data: users, isLoading } = useUsers();
  const { createUser, isCreating } = useUserManagement();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box>
      <UserForm onSubmit={createUser} isLoading={isCreating} />
      <UserList users={users} />
    </Box>
  );
};
```

### **Example 2: Form with Validation**

```typescript
// 1. Validation schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user']),
});

type UserFormData = z.infer<typeof userSchema>;

// 2. Custom Hook for the form
const useUserForm = (onSubmit: (data: UserFormData) => void) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      // Handle error
    }
  });

  return {
    form,
    handleSubmit,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
  };
};

// 3. Form component
const UserForm: React.FC<{ onSubmit: (data: UserFormData) => void }> = ({
  onSubmit,
}) => {
  const { form, handleSubmit, errors } = useUserForm(onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel>Name</FormLabel>
        <Input {...form.register('name')} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input type="email" {...form.register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit" isLoading={form.formState.isSubmitting}>
        Create User
      </Button>
    </form>
  );
};
```

This architecture provides:

- ✅ **Scalability**: Easy to add new features
- ✅ **Maintainability**: Organized and predictable code
- ✅ **Testability**: Each layer can be tested independently
- ✅ **Reusability**: Reusable components and hooks
- ✅ **Performance**: Optimizations at each layer
- ✅ **Developer Experience**: Efficient development and easy debugging
