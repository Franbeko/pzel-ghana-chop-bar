import Tsintago from "./Drinks1.jpg"
import Guinness from "./Drinks2.jpg"
import OrijinBitters from "./Drinks3.jpg"
import AlomoBitters from "./Drinks4.jpg"
import Juice from "./Drink13.jpg"
import Breezer from "./Drinks21.jpg"
import Vody from "./Drinks12.jpg"
import Heineken from "./Drinks8.jpg"
import Faxe from "./Drinks18.jpg"
import Yanjian from "./Drinks15.jpg"
import SavanaDry from "./Drinks5.jpg"
import Malta from "./Drinks7.jpg"
import AloeVera from "./Drinks11.jpg"
import JingJlu from "./Drinks19.jpg"
import CartubaBitter from "./Drinks20.jpg"
import Rox from "./Drinks17.jpg"
import OrijinBeerCan from "./Drinks16.jpg"
import ExtralJuice from "./Drinks14.jpg"
import CanSoftDrinks from "./Drinks10.jpg"
import CanHeineken from "./Drinks9.jpg"
import Banku from "./Menu1.jpg"
import DumboywithFish from "./Menu2.jpg"
import RiceBall from "./Menu6.jpg"
import Konkonte from "./Menu5.jpg"
import DumboywithCow from "./Menu1.jpg"
import GranolaParfait from "./GranolaParfait.png"


export const dummyMenuData = {
  "Daily Specials (Mon-Sat)": [
    {
      id: 'daily-1',
      name: 'Banku with Okra Stew',
      priceLRD: '1700',
      priceUSD: '9.73',
      image: Banku,
      description: 'Soft banku served with rich, savory okra stew. A hearty local favorite.',
      options: ['Goat', 'Cow', 'Fish'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'daily-2',
      name: 'Dumboy with Fish',
      priceLRD: '1500',
      priceUSD: '8.58',
      image: DumboywithFish,
      description: 'Soft, fluffy dough served with tender, flavorful fish.',
      options: ['Goat', 'Cow', 'Fish'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'daily-3',
      name: 'Dumboy with Cow / Goat Meat',
      priceLRD: '1700',
      priceUSD: '9.73',
      image: DumboywithCow,
      description: 'Soft, fluffy dough served with tender cow or goat meat. A hearty local favorite',
      options: ['Goat', 'Cow'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    }
  ],
  "Sunday Specials": [
    {
      id: 'sunday-1',
      name: 'Konkonte with peanut soup (Goat or Cow)',
      priceLRD: '1700',
      priceUSD: '9.73',
      image: Konkonte,
      description: 'Smooth konkonte served in rich, creamy peanut soup with tender cow or goat meat.',
      options: ['Goat', 'Cow'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'sunday-2',
      name: 'Rice Ball with Peanut Soup (Goat or Cow)',
      priceLRD: '1700',
      priceUSD: '9.73',
      image: RiceBall,
      description: 'Soft rice balls in rich, creamy peanut soup with tender cow or goat meat. A hearty local favorite.',
      options: ['Goat', 'Cow'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    }
  ],
  "Rice Dishes": [
    {
      id: 'rice-1',
      name: 'Ghanaian Fried Rice',
      priceLRD: '1900',
      priceUSD: '9.50',
      image: GranolaParfait,
      description: 'Ghanaian-style fried rice with your choice of grilled fish or chicken.',
      options: ['Grilled Fish', 'Grilled Chicken'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    }
  ],
  "Drinks": [
    {
      id: 'drink-1',
      name: 'Tsintago',
      priceLRD: '400',
      priceUSD: '2.29',
      image: Tsintago,
      description: 'Premium imported beer, served chilled',
      type: 'Beer'
    },
    {
      id: 'drink-2',
      name: 'Stout',
      priceLRD: '350',
      priceUSD: '2.01',
      image: Guinness,
      description: 'Rich and creamy dark beer',
      type: 'Stout'
    },
    {
      id: 'drink-3',
      name: 'Orijin Bitters',
      priceLRD: '350',
      priceUSD: '2.01',
      image: OrijinBitters,
      description: 'Local origins beer, brewed fresh',
      type: 'Beer'
    },
    {
      id: 'drink-4',
      name: 'Alomo Bitters',
      priceLRD: '350',
      priceUSD: '2.01',
      image: AlomoBitters,
      description: 'Chilled soft drinks served ice cold',
      type: 'Soda'
    },
    {
      id: 'drink-5',
      name: 'Pure Heaven Juice',
      priceLRD: '700',
      priceUSD: '4.01',
      image: Juice,
      description: 'Natural fruit juice, refreshing and healthy',
      type: 'Juice'
    },
    {
      id: 'drink-6',
      name: 'Breezer',
      priceLRD: '380',
      priceUSD: '2.17',
      image: Breezer,
      description: 'Fruity and refreshing cooler drink',
      type: 'Cooler'
    },
    {
      id: 'drink-7',
      name: 'Vody',
      priceLRD: '500',
      priceUSD: '2.50',
      image: Vody,
      description: 'Premium vody, smooth and bold',
      type: 'Vody'
    },
    {
      id: 'drink-8',
      name: 'Heineken',
      priceLRD: '400',
      priceUSD: '2.00',
      image: Heineken,
      description: 'Smooth spirit drink',
      type: 'Beer'
    },
    {
      id: 'drink-9',
      name: 'Faxe',
      priceLRD: '500',
      priceUSD: '2.86',
      image: Faxe,
      description: 'Creamy liquor drink',
      type: '10%'
    },
    {
      id: 'drink-10',
      name: 'Yanjian',
      priceLRD: '400',
      priceUSD: '2.29',
      image: Yanjian,
      description: 'Traditional local drink',
      type: 'Alcoholic'
    },
    {
      id: 'drink-11',
      name: 'Savana Dry',
      priceLRD: '380',
      priceUSD: '15.70',
      image: SavanaDry,
      description: 'Crisp dry cider with a light',
      type: 'Cider'
    },
    {
      id: 'drink-12',
      name: 'Malta',
      priceLRD: '270',
      priceUSD: '11.15',
      image: Malta,
      description: 'Sweet, malty, and refreshing',
      type: 'Beverage'
    },
    {
      id: 'drink-13',
      name: 'Aloe Vera',
      priceLRD: '400',
      priceUSD: '2.29',
      image: AloeVera,
      description: 'Cool, soothing, and naturally refreshing.',
      type: 'Beverage'
    },
    {
      id: 'drink-14',
      name: 'Jing Jlu',
      priceLRD: '873',
      priceUSD: '5.00',
      image: JingJlu,
      description: 'Light, smooth, and refreshing. A cool and easy sip.',
      type: 'Beverage'
    },
    {
      id: 'drink-15',
      name: 'Cartuba Bitter',
      priceLRD: '700',
      priceUSD: '4.01',
      image: CartubaBitter,
      description: 'Light, smooth, and refreshing. A cool and easy sip.',
      type: 'Beverage'
    },
    {
      id: 'drink-16',
      name: 'Rox',
      priceLRD: '220',
      priceUSD: '1.26',
      image: Rox,
      description: 'Bold, sweet, and energizing. A strong local favorite.',
      type: 'Beverage'
    },
    {
      id: 'drink-17',
      name: 'Orijin Beer Can',
      priceLRD: '450',
      priceUSD: '2.58',
      image: OrijinBeerCan,
      description: 'Crisp, smooth, and refreshing. A cold can of easy-drinking beer.',
      type: 'Beverage'
    },
    {
      id: 'drink-18',
      name: 'Extral Juice',
      priceLRD: '220',
      priceUSD: '1.26',
      image: ExtralJuice,
      description: 'Fresh, fruity juice with a naturally sweet taste. Refreshing anytime.',
      type: 'Beverage'
    },
    {
      id: 'drink-19',
      name: 'Can Soft Drinks',
      priceLRD: '150',
      priceUSD: '6.20',
      image: CanSoftDrinks,
      description: 'Chilled, fizzy, and refreshing. A classic thirst-quencher.',
      type: 'Beverage'
    },
    {
      id: 'drink-20',
      name: 'Can Heineken',
      priceLRD: '500',
      priceUSD: '20.65',
      image: CanHeineken,
      description: 'Premium lager in a convenient can. Crisp, cold, and refreshing.',
      type: 'Beverage'
    }
  ]
};