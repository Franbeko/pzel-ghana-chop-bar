import Heineken from "./Heineken.jpg"
import Guinness from "./Guinness.jpg"
import Beer from "./Beer.png"
import Soda from "./Soda.jpg"
import Juice from "./Juice.jpg"
import Breezer from "./Breezer.png"
import Whiskey from "./Whiskey.jpg"
import PannaCotta from "./PannaCotta.png"
import Creamy from "./Baileys.jpg"
import Yanjian from "./SpaghettiCarbonara.png"
import Herbal from "./Origins.jpg"
import Water from "./Water.jpg"
import TacosalPastor from "./TacosalPastor.png"
import ChickenQuesadilla from "./ChickenQuesadilla.png"
import Enchiladas from "./Enchiladas.png"
import Fajitas from "./Fajitas.png"
import GrilledRibeyeSteak from "./GrilledRibeyeSteak.png"
import SalmonFillet from "./SalmonFillet.png"
import RoastChicken from "./RoastChicken.png"
import PastaPrimavera from "./PastaPrimavera.png"
import RedChickenCurry from "./RedChickenCurry.png"
import Fufu from "./Fufu.jpg"
import BreakfastBurrito from "./BreakfastBurrito.png";
import Banku from "./Banku.png"
import PancakeswithMapleSyrup from "./PancakeswithMapleSyrup.png"
import FruitSmoothieBowl from "./FruitSmoothieBowl.png"
import BananaToast from "./BananaToast.png"
import BagelSmash from "./BagelSmash.png"
import FruitWaffle from "./FruitWaffle.png"
import FrenchToast from './FrenchToast.png'
import SunnyOats from "./SunnyOats.png"
import BagelwithLox from "./BagelwithLox.png"
import ChickenCaesarSalad from "./ChickenCaesarSalad.png"
import ClubSandwich from "./ClubSandwich.png"
import VeggieWrap from "./VeggieWrap.png"
import GrilledCheeseSandwich from "./GrilledCheeseSandwich.png"
import GranolaParfait from "./GranolaParfait.png"
import GrilledSalmonBowl from "./GrilledSalmonBowl.png"
import SpicyBeefTacos from "./SpicyBeefTacos.png"
import SushiCombo from "./SushiCombo.png"
import TurkeyPanini from "./TurkeyPanini.png"
import QuinoaSalad from "./QuinoaSalad.png"
import PastaSalad from "./PastaSalad.png"
import FishTacos from "./FishTacos.png"
import ChickenParmesan from "./ChickenParmesan.png"
import PestoPastaWithShrimp from "./PestoPastaWithShrimp.png"
import GarlicButterLambChops from "./GarlicButterLambChops.png"
import VegetarianStuffedPeppers from "./VegetarianStuffedPeppers.png"
import BeefBourguignon from "./BeefBourguignon.png"
import VegetableStirFry from "./VegetableStirFry.png"
import ShrimpScampi from "./ShrimpScampi.png"
import LambChops from "./LambChops.png"
import ChilesRellenos from "./ChilesRellenos.png"
import MolePoblano from "./MolePoblano.png"
import PozoleRojo from "./PozoleRojo.png"
import Churros from "./Churros.png"
import Nachos from "./Nachos.png"
import Burrito from "./Burrito.png"
import Tamales from "./Tamales.png"
import Chilaquiles from "./Chilaquiles.png"
import FocacciaBread from "./FocacciaBread.png"
import PenneArrabbiata from "./PenneArrabbiata.png"
import EggplantParmesan from "./EggplantParmesan.png"
import CapreseSalad from "./CapreseSalad.png"
import FettuccineAlferdo from "./FettuccineAlferdo.png"
import PestoPasta from "./PestoPasta.png"
import Gnocchi from "./Gnocchi.png"
import OssoBuco from "./OssoBuco.png"
import Pavlova from "./Pavlova.png"
import ChocolateLavaCake from "./ChocolateLavaCake.png"
import Baklava from "./Baklava.png"
import CheeseCake from "./Cheesecake.png"
import ChocolateMousse from "./ChocolateMousse.png"
import Profiteroles from "./Profiteroles.png"
import RicottaPie from "./RicottaPie.png"
import StrawberryShortcake from "./StrawberryShortcake.png"
import MochaFrappuccino from "./MochaFrappuccino.png"
import CaramelMacchiato from "./CaramelMacchiato.png"
import StrawberryMilkshake from "./StrawberryMilkshake.png"
import GreenTeaSmoothie from "./GreenTeaSmoothie.png"
import Cappuccino from "./Cappuccino.png"
import Lemonade from "./Lemonade.png"
import Espresso from "./Espresso.png"
import Margarita from "./Margarita.png"


export const dummyMenuData = {
  "Daily Specials (Mon-Sat)": [
    {
      id: 'daily-1',
      name: 'Durkun with Okra Stew',
      priceLRD: '1700',
      priceUSD: '8.50',
      image: Fufu,
      description: 'Served with goat, cow or fish. Choose your meat preference.',
      options: ['Goat', 'Cow', 'Fish'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'daily-2',
      name: 'Durkun with Peanut Soup',
      priceLRD: '1700',
      priceUSD: '8.50',
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
      image: PancakeswithMapleSyrup,
      description: 'Cassava dumplings served with rich peanut soup.',
      options: ['Goat', 'Cow', 'Fish'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'daily-4',
      name: 'Dumboy with Light Soup',
      priceLRD: '1700',
      priceUSD: '8.50',
      image: FruitSmoothieBowl,
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
      priceLRD: '1700',
      priceUSD: '8.50',
      image: FrenchToast,
      description: 'Corn dough balls with green leaf soup. Served with goat or cow meat.',
      options: ['Goat', 'Cow'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'sunday-2',
      name: 'Rice Ball with Peanut Soup',
      priceLRD: '1700',
      priceUSD: '8.50',
      image: BreakfastBurrito,
      description: 'Mashed rice balls served with rich peanut soup.',
      options: ['Goat', 'Cow'],
      eatIn: 'L$1,700',
      takeaway: 'L$1,900'
    },
    {
      id: 'sunday-3',
      name: 'Konkonte with Peanut Soup',
      priceLRD: '1700',
      priceUSD: '8.50',
      image: BagelwithLox,
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
      name: 'Heineken',
      priceLRD: '400',
      priceUSD: '2.00',
      image: Heineken,
      description: 'Premium imported beer, served chilled',
      type: 'Beer'
    },
    {
      id: 'drink-2',
      name: 'Guinness',
      priceLRD: '450',
      priceUSD: '2.25',
      image: Guinness,
      description: 'Rich and creamy dark beer',
      type: 'Stout'
    },
    {
      id: 'drink-3',
      name: 'Club Beer',
      priceLRD: '400',
      priceUSD: '2.00',
      image: Beer,
      description: 'Local origins beer, brewed fresh',
      type: 'Beer'
    },
    {
      id: 'drink-4',
      name: 'Coke, Fanta, Sprite',
      priceLRD: '200',
      priceUSD: '1.00',
      image: Soda,
      description: 'Chilled soft drinks served ice cold',
      type: 'Soda'
    },
    {
      id: 'drink-5',
      name: 'Pure Heaven Juice',
      priceLRD: '300',
      priceUSD: '1.50',
      image: Juice,
      description: 'Natural fruit juice, refreshing and healthy',
      type: 'Juice'
    },
    {
      id: 'drink-6',
      name: 'Breezer',
      priceLRD: '600',
      priceUSD: '3.00',
      image: Breezer,
      description: 'Fruity and refreshing cooler drink',
      type: 'Cooler'
    },
    {
      id: 'drink-7',
      name: 'Whiskey',
      priceLRD: '500',
      priceUSD: '2.50',
      image: Whiskey,
      description: 'Premium whiskey, smooth and bold',
      type: 'Whiskey'
    },
    {
      id: 'drink-8',
      name: 'Best Jin',
      priceLRD: '400',
      priceUSD: '2.00',
      image: PannaCotta,
      description: 'Smooth spirit drink',
      type: 'Spirit'
    },
    {
      id: 'drink-9',
      name: 'Best Cream',
      priceLRD: '400',
      priceUSD: '2.00',
      image: Creamy,
      description: 'Creamy liquor drink',
      type: 'Liquor'
    },
    {
      id: 'drink-10',
      name: 'Yanjian',
      priceLRD: '500',
      priceUSD: '2.50',
      image: Yanjian,
      description: 'Traditional local drink',
      type: 'Alcoholic'
    },
    {
      id: 'drink-11',
      name: 'Origin Bitters',
      priceLRD: '350',
      priceUSD: '1.75',
      image: Herbal,
      description: 'Herbal bitters drink',
      type: 'Bitters'
    },
    {
      id: 'drink-12',
      name: 'Bottled Water',
      priceLRD: '150',
      priceUSD: '0.75',
      image: Water,
      description: 'Pure bottled drinking water',
      type: 'Water'
    }
  ]
};