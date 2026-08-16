import BreakfastBurrito from "./BreakfastBurrito.png";
import RiceBalls from "./RiceBalls.jpg"
import Banku from "./Banku.png"
import Banku2 from "./Banku-Tilapia.jpeg"
import FrenchToast from './FrenchToast.png'
import Fufu from "./Fufu.jpg"
import BagelwithLox from "./BagelwithLox.png"
import GranolaParfait from "./GranolaParfait.png"
import ChickenCaesarSalad from "./ChickenCaesarSalad.png"
import ClubSandwich from "./ClubSandwich.png"
import VeggieWrap from "./VeggieWrap.png"
import GrilledCheeseSandwich from "./GrilledCheeseSandwich.png"
import TurkeyPanini from "./TurkeyPanini.png"
import QuinoaSalad from "./QuinoaSalad.png"
import PastaSalad from "./PastaSalad.png"
import FishTacos from "./FishTacos.png"
import GrilledRibeyeSteak from "./GrilledRibeyeSteak.png"
import SalmonFillet from "./SalmonFillet.png"
import RoastChicken from "./RoastChicken.png"
import PastaPrimavera from "./PastaPrimavera.png"
import BeefBourguignon from "./BeefBourguignon.png"
import VegetableStirFry from "./VegetableStirFry.png"
import ShrimpScampi from "./ShrimpScampi.png"
import LambChops from "./LambChops.png"
import TacosalPastor from "./TacosalPastor.png"
import ChickenQuesadilla from "./ChickenQuesadilla.png"
import Enchiladas from "./Enchiladas.png"
import Fajitas from "./Fajitas.png"
import Nachos from "./Nachos.png"
import Burrito from "./Burrito.png"
import Tamales from "./Tamales.png"
import Chilaquiles from "./Chilaquiles.png"
import Lasagna from "./Lasagna.png"
import SpaghettiCarbonara from "./SpaghettiCarbonara.png"
import Risotto from "./Risotto.png"
import MargheritaPizza from "./MargheritaPizza.png"
import FettuccineAlferdo from "./FettuccineAlferdo.png"
import PestoPasta from "./PestoPasta.png"
import Gnocchi from "./Gnocchi.png"
import OssoBuco from "./OssoBuco.png"
import Tsingtao from "./Tsintago.jpg"
import Guinness from "./Guinness.jpg"
import Heineken from "./Heineken.jpg"
import Vody from "./Vody.jpg"
import MALT from "./MALT.png"
import Drinks from "./fanta.jpg"
import Profiteroles from "./Whiskey.jpg"
import Breezer from "./Breezer.png"
import Beer from "./Beer.png"
import ClubBeer from "./ClubBeer.jpg"
import Coke from "./Coke.jpg"
import FruitJuice from "./juice.jpg"
import Cappuccino from "./Cappuccino.png"
import Lemonade from "./Lemonade.png"
import Espresso from "./Espresso.png"
import Margarita from "./Margarita.png"

export const dummyMenuData = {
  "Daily Specials (Mon-Sat)": [
    {
      id: 'daily-1',
      name: 'Durkun with Okra Stew',
      priceLRD: '1,700',
      priceUSD: '8.50',
      rating: 4.9,
      image: Fufu,
      description: 'Served with goat, cow or fish. Choose your meat preference.',
      options: ['Goat', 'Cow', 'Fish'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'daily-2',
      name: 'Durkun with Peanut Soup',
      priceLRD: '1,700',
      priceUSD: '8.50',
      rating: 4.8,
      image: Banku,
      description: 'Rich peanut soup with goat, cow or fish.',
      options: ['Goat', 'Cow', 'Fish'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'daily-3',
      name: 'Dumboy with Peanut Soup',
      priceLRD: '1700',
      priceUSD: '8.50',
      rating: 4.8,
      image: RiceBalls,
      description: 'Cassava dumplings served with rich peanut soup.',
      options: ['Goat', 'Cow', 'Fish'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'daily-4',
      name: 'Dumboy with Light Soup',
      priceLRD: '1,700',
      priceUSD: '8.50',
      rating: 4.7,
      image: Banku2,
      description: 'Cassava dumplings served with spicy light soup.',
      options: ['Goat', 'Cow', 'Fish'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    }
  ],
  "Sunday Specials": [
    {
      id: 'sunday-1',
      name: 'TZ (Tuo Zaafi)',
      priceLRD: '1,700',
      priceUSD: '8.50',
      rating: 4.9,
      image: Fufu,
      description: 'Corn dough balls with green leaf soup. Served with goat or cow meat.',
      options: ['Goat', 'Cow'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'sunday-2',
      name: 'Rice Ball with Peanut Soup',
      priceLRD: '1,700',
      priceUSD: '8.50',
      rating: 4.8,
      image: RiceBalls,
      description: 'Mashed rice balls served with rich peanut soup.',
      options: ['Goat', 'Cow'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'sunday-3',
      name: 'Konkonte with Peanut Soup',
      priceLRD: '1,700',
      priceUSD: '8.50',
      rating: 4.8,
      image: Banku,
      description: 'Dried cassava powder with rich peanut soup.',
      options: ['Goat', 'Cow'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    }
  ],
  "Rice Dishes": [
    {
      id: 'rice-1',
      name: 'Ghanaian Fried Rice',
      priceLRD: '1,900',
      priceUSD: '9.50',
      rating: 4.9,
      image: Banku2,
      description: 'Ghanaian-style fried rice with your choice of grilled fish or chicken.',
      options: ['Grilled Fish', 'Grilled Chicken'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    }
  ],
  "Drinks": [
    {
      id: 'drink-1',
      name: 'Tsingtao',
      priceLRD: '500',
      priceUSD: '2.50',
      rating: 4.5,
      image: Tsingtao ,
      description: 'Traditional local drink',
      type: 'Alcoholic'
    },
    {
      id: 'drink-2',
      name: 'Yanjian',
      priceLRD: '500',
      priceUSD: '2.50',
      rating: 4.5,
      image: Guinness,
      description: 'Traditional local drink',
      type: 'Alcoholic'
    },
    {
      id: 'drink-3',
      name: 'Heineken',
      priceLRD: '400',
      priceUSD: '2.00',
      rating: 4.6,
      image: Heineken,
      description: 'Premium imported beer, served chilled',
      type: 'Beer'
    },
    {
      id: 'drink-4',
      name: 'Best Jin',
      priceLRD: '400',
      priceUSD: '2.00',
      rating: 4.4,
      image: Vody,
      description: 'Smooth spirit drink',
      type: 'Spirit'
    },
    {
      id: 'drink-5',
      name: 'Best Cream',
      priceLRD: '400',
      priceUSD: '2.00',
      rating: 4.4,
      image: MALT,
      description: 'Creamy liquor drink',
      type: 'Liquor'
    },
    {
      id: 'drink-6',
      name: 'Best Infino',
      priceLRD: '400',
      priceUSD: '2.00',
      rating: 4.4,
      image: Drinks,
      description: 'Smooth spirit drink',
      type: 'Spirit'
    },
    {
      id: 'drink-7',
      name: 'Jack Daniel',
      priceLRD: '500',
      priceUSD: '2.50',
      rating: 4.6,
      image: Profiteroles,
      description: 'Premium whiskey, smooth and bold',
      type: 'Whiskey'
    },
    {
      id: 'drink-8',
      name: 'Large Beer',
      priceLRD: '400',
      priceUSD: '2.00',
      rating: 4.5,
      image: Beer,
      description: 'Large size refreshing beer',
      type: 'Beer'
    },
    {
      id: 'drink-9',
      name: 'Stout',
      priceLRD: '450',
      priceUSD: '2.25',
      rating: 4.7,
      image: Guinness,
      description: 'Rich and creamy dark beer',
      type: 'Stout'
    },
    {
      id: 'drink-10',
      name: 'Small Beer',
      priceLRD: '250',
      priceUSD: '1.25',
      rating: 4.4,
      image: ClubBeer,
      description: 'Small size refreshing beer',
      type: 'Beer'
    },
    {
      id: 'drink-11',
      name: 'Medium Beer',
      priceLRD: '350',
      priceUSD: '1.75',
      rating: 4.5,
      image: Beer,
      description: 'Medium size refreshing beer',
      type: 'Beer'
    },
    {
      id: 'drink-12',
      name: 'Breezer',
      priceLRD: '600',
      priceUSD: '3.00',
      rating: 4.6,
      image: Breezer,
      description: 'Fruity and refreshing cooler drink',
      type: 'Cooler'
    },
    {
      id: 'drink-13',
      name: 'Pure Heaven Juice',
      priceLRD: '300',
      priceUSD: '1.50',
      rating: 4.7,
      image: FruitJuice,
      description: 'Natural fruit juice, refreshing and healthy',
      type: 'Juice'
    },
    {
      id: 'drink-14',
      name: 'Extra Juice',
      priceLRD: '350',
      priceUSD: '1.75',
      rating: 4.6,
      image: Drinks,
      description: 'Premium fruit juice blend',
      type: 'Juice'
    },
    {
      id: 'drink-15',
      name: 'Coke',
      priceLRD: '200',
      priceUSD: '1.00',
      rating: 4.5,
      image: Coke,
      description: 'Classic Coca-Cola, served ice cold',
      type: 'Soda'
    },
    {
      id: 'drink-16',
      name: 'Fanta',
      priceLRD: '200',
      priceUSD: '1.00',
      rating: 4.5,
      image: Drinks,
      description: 'Orange flavored Fanta, served ice cold',
      type: 'Soda'
    },
    {
      id: 'drink-17',
      name: 'Sprite',
      priceLRD: '200',
      priceUSD: '1.00',
      rating: 4.5,
      image: Drinks,
      description: 'Lemon-lime Sprite, served ice cold',
      type: 'Soda'
    },
    {
      id: 'drink-18',
      name: 'Tonic',
      priceLRD: '250',
      priceUSD: '1.25',
      rating: 4.4,
      image: Drinks,
      description: 'Classic tonic water',
      type: 'Mixer'
    },
    {
      id: 'drink-19',
      name: 'Origins Beer',
      priceLRD: '400',
      priceUSD: '2.00',
      rating: 4.5,
      image: Beer,
      description: 'Local origins beer, brewed fresh',
      type: 'Beer'
    },
    {
      id: 'drink-20',
      name: 'Origin Bitters',
      priceLRD: '350',
      priceUSD: '1.75',
      rating: 4.5,
      image: MALT,
      description: 'Herbal bitters drink',
      type: 'Bitters'
    }
  ]
};