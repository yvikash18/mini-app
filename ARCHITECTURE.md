# FragmentPage - Modular Architecture

This document explains the refactored modular structure of the FragmentPage component.

## Architecture Overview

The FragmentPage has been refactored from a single monolithic component into a modular architecture with the following structure:

### 📁 Hooks (`src/hooks/`)
Custom hooks that encapsulate business logic and state management:

- **`useUrlParams`** - Extracts and parses URL parameters for deal information
- **`useSubscription`** - Manages subscription state with localStorage persistence
- **`useTonTransaction`** - Handles TON blockchain transactions

### 📁 Components (`src/components/`)
Reusable UI components, each with a single responsibility:

- **`Header`** - Site header with logo
- **`Footer`** - Site footer with navigation links
- **`DealHeader`** - Deal status and domain display
- **`DealInfoTable`** - Price and commission information table
- **`UserInfo`** - User details (username, addresses)
- **`ConnectButton`** - TON Connect wallet integration button
- **`SubscriptionToggle`** - Subscription management toggle
- **`KYCInfo`** - KYC verification information display
- **`TradeInfoTable`** - Trade status and buyer information

### 📁 Utils (`src/utils/`)
Utility functions for common operations:

- **`currency.ts`** - Currency conversion and formatting functions

### 📁 Constants (`src/constants/`)
Application constants and configuration:

- **`links.ts`** - External links and addresses

### 📁 Types (`src/types/`)
TypeScript type definitions:

- **`deal.ts`** - Deal-related type definitions

## Benefits of This Architecture

### 🔧 Maintainability
- **Single Responsibility**: Each component has one clear purpose
- **Separation of Concerns**: Business logic separated from UI components
- **Easy Testing**: Individual components and hooks can be tested in isolation

### 🔄 Reusability
- Components can be reused across different pages
- Hooks can be shared between components
- Utilities are available application-wide

### 📈 Scalability
- New features can be added without modifying existing components
- Easy to extend functionality by adding new hooks or components
- Clear structure makes onboarding new developers easier

### 🐛 Debugging
- Smaller components are easier to debug
- Clear data flow through props and hooks
- Type safety prevents common errors

## Usage Example

```tsx
import { FC } from 'react';
import { Header } from '@/components/Header/Header';
import { useUrlParams, useSubscription } from '@/hooks';

export const MyPage: FC = () => {
  const { username, dealPrice } = useUrlParams();
  const { subscribed, toggleSubscription } = useSubscription();
  
  return (
    <div>
      <Header />
      {/* Your content */}
    </div>
  );
};
```

## File Structure
```
src/
├── components/
│   ├── Header/Header.tsx
│   ├── Footer/Footer.tsx
│   ├── DealHeader/DealHeader.tsx
│   ├── DealInfoTable/DealInfoTable.tsx
│   ├── UserInfo/UserInfo.tsx
│   ├── ConnectButton/ConnectButton.tsx
│   ├── SubscriptionToggle/SubscriptionToggle.tsx
│   ├── KYCInfo/KYCInfo.tsx
│   └── TradeInfoTable/TradeInfoTable.tsx
├── hooks/
│   ├── index.ts
│   ├── useUrlParams.ts
│   ├── useSubscription.ts
│   └── useTonTransaction.ts
├── utils/
│   ├── index.ts
│   └── currency.ts
├── constants/
│   ├── index.ts
│   └── links.ts
├── types/
│   └── deal.ts
└── pages/
    └── FragmentPage/
        └── FragmentPage.tsx
```

## Future Improvements

1. **Error Boundaries**: Add error boundaries for better error handling
2. **Loading States**: Add loading states for async operations
3. **Internationalization**: Add i18n support for multiple languages
4. **Theme Support**: Add theme provider for consistent styling
5. **State Management**: Consider adding global state management (Zustand/Redux) if needed
