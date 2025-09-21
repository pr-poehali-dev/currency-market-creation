import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Game {
  id: string;
  name: string;
  image: string;
  currencies: Currency[];
}

interface Currency {
  id: string;
  name: string;
  price: number;
  seller: Seller;
  rating: number;
  verified: boolean;
  stock: number;
}

interface Seller {
  name: string;
  rating: number;
  sales: number;
  verified: boolean;
}

const popularGames: Game[] = [
  {
    id: '1',
    name: 'World of Warcraft',
    image: '🌟',
    currencies: [
      {
        id: '1',
        name: 'WoW Gold',
        price: 12.99,
        seller: { name: 'ProGamer777', rating: 4.9, sales: 1205, verified: true },
        rating: 5.0,
        verified: true,
        stock: 50000
      }
    ]
  },
  {
    id: '2', 
    name: 'Genshin Impact',
    image: '⚡',
    currencies: [
      {
        id: '2',
        name: 'Primogems',
        price: 8.50,
        seller: { name: 'GameMaster', rating: 4.8, sales: 890, verified: true },
        rating: 4.9,
        verified: true,
        stock: 10000
      }
    ]
  },
  {
    id: '3',
    name: 'Fortnite',
    image: '🎯',
    currencies: [
      {
        id: '3',
        name: 'V-Bucks',
        price: 15.00,
        seller: { name: 'EliteTrader', rating: 4.7, sales: 567, verified: false },
        rating: 4.6,
        verified: false,
        stock: 25000
      }
    ]
  },
  {
    id: '4',
    name: 'Minecraft',
    image: '⛏️',
    currencies: [
      {
        id: '4',
        name: 'Minecoins',
        price: 6.99,
        seller: { name: 'CraftKing', rating: 4.9, sales: 1450, verified: true },
        rating: 4.8,
        verified: true,
        stock: 15000
      }
    ]
  }
];

export default function GameMarketplace() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Icon name="Gamepad2" size={32} className="text-primary" />
                <h1 className="text-2xl font-gaming font-bold text-primary">GameCurrency</h1>
              </div>
              
              <div className="hidden md:flex space-x-6">
                <a href="#" className="nav-link">Главная</a>
                <a href="#" className="nav-link">Каталог</a>
                <a href="#" className="nav-link">Игры</a>
                <a href="#" className="nav-link">Рейтинги</a>
                <a href="#" className="nav-link">Поддержка</a>
                <a href="#" className="nav-link">Гарантии</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input 
                  placeholder="Поиск игр и валют..." 
                  className="pl-10 w-64 bg-input/50"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="User" size={20} />
                <span className="hidden sm:inline ml-2">Профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-background to-background/50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-gaming font-bold mb-6 animate-fade-in">
            Маркетплейс игровых валют
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Безопасная покупка и продажа внутриигровых валют с верификацией продавцов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="btn-gaming text-lg px-8 py-4">
              <Icon name="ShoppingCart" className="mr-2" />
              Начать покупки
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <Icon name="Shield" className="mr-2" />
              Гарантии безопасности
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-gaming font-bold">Популярные игры</h2>
            <Button variant="outline">
              <Icon name="Grid" className="mr-2" />
              Все игры
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGames.map((game) => (
              <Card key={game.id} className="card-gaming group">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{game.image}</div>
                  <h3 className="text-xl font-gaming font-semibold">{game.name}</h3>
                </div>
                
                {game.currencies.map((currency) => (
                  <div key={currency.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{currency.name}</span>
                      <Badge variant={currency.verified ? "default" : "secondary"}>
                        {currency.verified ? "Верифицирован" : "Не верифицирован"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={16} />
                      <span className="text-sm">{currency.seller.name}</span>
                      {currency.seller.verified && (
                        <Icon name="BadgeCheck" size={16} className="text-primary" />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                        <span>{currency.seller.rating}</span>
                        <span>({currency.seller.sales} продаж)</span>
                      </div>
                      <span>В наличии: {currency.stock.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-primary">${currency.price}</span>
                      <Button size="sm" className="btn-gaming">
                        <Icon name="ShoppingCart" size={16} className="mr-1" />
                        Купить
                      </Button>
                    </div>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-gaming font-bold text-center mb-12">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-gaming font-semibold mb-3">Безопасность</h3>
              <p className="text-muted-foreground">
                Все транзакции защищены системой эскроу. Гарантия возврата средств.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="BadgeCheck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-gaming font-semibold mb-3">Верификация</h3>
              <p className="text-muted-foreground">
                Все продавцы проходят строгую верификацию для вашей безопасности.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-gaming font-semibold mb-3">Быстрая доставка</h3>
              <p className="text-muted-foreground">
                Большинство заказов выполняется в течение 15 минут.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Gamepad2" size={24} className="text-primary" />
                <span className="text-xl font-gaming font-bold">GameCurrency</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Надежный маркетплейс игровых валют с гарантией безопасности.
              </p>
              <div className="flex space-x-4">
                <Icon name="MessageCircle" className="text-primary hover:text-primary/80 cursor-pointer" />
                <Icon name="Mail" className="text-primary hover:text-primary/80 cursor-pointer" />
                <Icon name="Phone" className="text-primary hover:text-primary/80 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-gaming font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Как купить</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Поддержка</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-gaming font-semibold mb-4">Продавцам</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Как продавать</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Верификация</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Комиссии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-gaming font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 GameCurrency. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}