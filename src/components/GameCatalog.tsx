import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import ChatDialog from '@/components/ChatDialog';

interface GameCurrency {
  id: string;
  name: string;
  price: number;
  seller: string;
  rating: number;
  sales: number;
  verified: boolean;
  stock: number;
  gameId: string;
}

interface GameCatalogData {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  image: string;
  currencies: GameCurrency[];
}

const gamesCatalog: GameCatalogData[] = [
  // Русские игры А-Я
  {
    id: '1',
    name: 'Аллоды Онлайн',
    nameEn: 'Allods Online',
    category: 'MMORPG',
    image: '⚔️',
    currencies: [
      {
        id: '1',
        name: 'Астралы',
        price: 5.99,
        seller: 'AllodsKing',
        rating: 4.7,
        sales: 234,
        verified: true,
        stock: 100000,
        gameId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Варфейс',
    nameEn: 'Warface',
    category: 'Shooter',
    image: '🔫',
    currencies: [
      {
        id: '2',
        name: 'Варбаксы',
        price: 3.50,
        seller: 'WarPro',
        rating: 4.5,
        sales: 567,
        verified: false,
        stock: 50000,
        gameId: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Мир Танков',
    nameEn: 'World of Tanks',
    category: 'Action',
    image: '🚗',
    currencies: [
      {
        id: '3',
        name: 'Золото WoT',
        price: 15.99,
        seller: 'TankMaster',
        rating: 4.9,
        sales: 1200,
        verified: true,
        stock: 200000,
        gameId: '3'
      }
    ]
  },
  // Английские игры A-Z
  {
    id: '4',
    name: 'Apex Legends',
    nameEn: 'Apex Legends',
    category: 'Battle Royale',
    image: '🎯',
    currencies: [
      {
        id: '4',
        name: 'Apex Coins',
        price: 9.99,
        seller: 'ApexPro',
        rating: 4.6,
        sales: 890,
        verified: true,
        stock: 75000,
        gameId: '4'
      }
    ]
  },
  {
    id: '5',
    name: 'Dota 2',
    nameEn: 'Dota 2',
    category: 'MOBA',
    image: '🏆',
    currencies: [
      {
        id: '5',
        name: 'Steam Wallet',
        price: 12.00,
        seller: 'DotaLegend',
        rating: 4.8,
        sales: 1500,
        verified: true,
        stock: 300000,
        gameId: '5'
      }
    ]
  },
  {
    id: '6',
    name: 'Fortnite',
    nameEn: 'Fortnite',
    category: 'Battle Royale',
    image: '🎮',
    currencies: [
      {
        id: '6',
        name: 'V-Bucks',
        price: 15.00,
        seller: 'FortnitePro',
        rating: 4.7,
        sales: 2100,
        verified: true,
        stock: 500000,
        gameId: '6'
      }
    ]
  },
  {
    id: '7',
    name: 'Genshin Impact',
    nameEn: 'Genshin Impact',
    category: 'RPG',
    image: '⚡',
    currencies: [
      {
        id: '7',
        name: 'Primogems',
        price: 8.50,
        seller: 'GenshinMaster',
        rating: 4.9,
        sales: 1800,
        verified: true,
        stock: 150000,
        gameId: '7'
      }
    ]
  },
  {
    id: '8',
    name: 'League of Legends',
    nameEn: 'League of Legends',
    category: 'MOBA',
    image: '⚡',
    currencies: [
      {
        id: '8',
        name: 'RP (Riot Points)',
        price: 10.50,
        seller: 'LeagueElite',
        rating: 4.8,
        sales: 2500,
        verified: true,
        stock: 400000,
        gameId: '8'
      }
    ]
  },
  {
    id: '9',
    name: 'Minecraft',
    nameEn: 'Minecraft',
    category: 'Sandbox',
    image: '⛏️',
    currencies: [
      {
        id: '9',
        name: 'Minecoins',
        price: 6.99,
        seller: 'CraftKing',
        rating: 4.9,
        sales: 1450,
        verified: true,
        stock: 250000,
        gameId: '9'
      }
    ]
  },
  {
    id: '10',
    name: 'World of Warcraft',
    nameEn: 'World of Warcraft',
    category: 'MMORPG',
    image: '🌟',
    currencies: [
      {
        id: '10',
        name: 'WoW Gold',
        price: 12.99,
        seller: 'ProGamer777',
        rating: 4.9,
        sales: 1205,
        verified: true,
        stock: 600000,
        gameId: '10'
      }
    ]
  }
];

export default function GameCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'MMORPG', 'MOBA', 'Battle Royale', 'Shooter', 'RPG', 'Action', 'Sandbox'];

  const filteredAndSortedGames = gamesCatalog
    .filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || game.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'ru');
        case 'nameEn':
          return a.nameEn.localeCompare(b.nameEn);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const russianGames = filteredAndSortedGames.filter(game => 
    /[а-яё]/i.test(game.name)
  );

  const englishGames = filteredAndSortedGames.filter(game => 
    !/[а-яё]/i.test(game.name)
  );

  const GameCard = ({ game }: { game: GameCatalogData }) => (
    <Card key={game.id} className="card-gaming">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{game.image}</div>
        <h3 className="text-lg font-gaming font-semibold">{game.name}</h3>
        {game.nameEn !== game.name && (
          <p className="text-sm text-muted-foreground">{game.nameEn}</p>
        )}
        <Badge variant="outline" className="mt-2">{game.category}</Badge>
      </div>

      {game.currencies.map((currency) => (
        <div key={currency.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">{currency.name}</span>
            <Badge variant={currency.verified ? "default" : "secondary"}>
              {currency.verified ? "✓ Верифицирован" : "Не верифицирован"}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Icon name="User" size={14} />
            <span className="text-sm">{currency.seller}</span>
            {currency.verified && (
              <Icon name="BadgeCheck" size={14} className="text-primary" />
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
              <span>{currency.rating}</span>
              <span>({currency.sales})</span>
            </div>
            <span>В наличии: {currency.stock.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xl font-bold text-primary">${currency.price}</span>
            <div className="flex space-x-2">
              <ChatDialog chatType="seller" chatWith={currency.seller}>
                <Button variant="outline" size="sm">
                  <Icon name="MessageCircle" size={14} />
                </Button>
              </ChatDialog>
              <Button size="sm" className="btn-gaming">
                <Icon name="ShoppingCart" size={14} className="mr-1" />
                Купить
              </Button>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-gaming font-bold mb-6">Каталог игр</h1>
          
          {/* Поиск и фильтры */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Поиск игр..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'Все категории' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">По названию (А-Я)</SelectItem>
                <SelectItem value="nameEn">По названию (A-Z)</SelectItem>
                <SelectItem value="category">По категории</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Каталог с табами */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">Все игры</TabsTrigger>
            <TabsTrigger value="russian">А-Я ({russianGames.length})</TabsTrigger>
            <TabsTrigger value="english">A-Z ({englishGames.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="russian">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {russianGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="english">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {englishGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredAndSortedGames.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Игры не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </div>
  );
}