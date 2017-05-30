
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './Home';
import Schedule from './schedule';


const TabContainer = TabNavigator(
    {
        Main: { screen: Home },
        Schedule: { screen: Schedule },
    }
);

const App = StackNavigator(
    {
        Home: {
            screen: TabContainer,

        }
    }
);

export default App