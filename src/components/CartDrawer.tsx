import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: string;
  gameName: string;
  currencyName: string;
  amount: number;
  price: number;
  seller: string;
  verified: boolean;
}

interface CartDrawerProps {
  children: React.ReactNode;
}

export default function CartDrawer({ children }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      gameName: 'World of Warcraft',
      currencyName: 'WoW Gold',
      amount: 50000,
      price: 12.99,
      seller: 'ProGamer777',
      verified: true
    },
    {
      id: '2',
      gameName: 'Genshin Impact',
      currencyName: 'Primogems',
      amount: 10000,
      price: 8.50,
      seller: 'GameMaster',
      verified: true
    }
  ]);

  const updateQuantity = (id: string, newAmount: number) => {
    if (newAmount <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, amount: newAmount } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Icon name="ShoppingCart" className="text-primary" />
            <span>Корзина ({cartItems.length})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Корзина пуста</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.gameName}</h4>
                      <p className="text-sm text-muted-foreground">{item.currencyName}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Продавец:</span>
                    <span className="text-sm font-medium">{item.seller}</span>
                    {item.verified && (
                      <Icon name="BadgeCheck" size={14} className="text-primary" />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, Math.max(1000, item.amount - 5000))}
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      <span className="px-3 py-1 bg-muted rounded text-sm">
                        {item.amount.toLocaleString()}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.amount + 5000)}
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                    <span className="font-bold text-primary">${item.price}</span>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Итого:</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full btn-gaming" size="lg">
                    <Icon name="CreditCard" className="mr-2" />
                    Оформить заказ
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Icon name="MessageCircle" className="mr-2" />
                    Связаться с продавцами
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  <Icon name="Shield" size={12} className="inline mr-1" />
                  Все покупки защищены гарантией
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}