import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {SafeAreaView, Text, View} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationsScreen from './screens/NotificationsScreen';
import NousContacterScreen from './screens/NousContacterScreen';
import ParrainerScreen from './screens/ParrainerScreen';
import PartagerScreen from './screens/PartagerScreen';
import PromotionsScreen from './screens/PromotionsScreen';
import MenuScreen from './screens/MenuScreen';
import TrouverLivreurScreen from './screens/TrouverLivreurScreen';
import Toast from 'react-native-toast-message';
import welcome from './pages/welcome';
import {Provider} from 'react-redux';
import {store} from './store/store';
import login_1 from './pages/login_1';
import login_2 from './pages/login_2';
import {headearNavigation} from './helpers/util';
import register from './pages/register';
import register_2 from './pages/register_2';
import register_3 from './pages/register_3';
import register_4 from './pages/register_4';
import Historique from './pages/historique';
import Encours from './pages/encours';
import encours_detail from './pages/encours_detail';
import Promotion from './pages/promotion';
import PromotionExterne from './pages/promotion_lien_externe';
import service_client from './pages/service_client';
import choix_vendeur from './pages/achat/choix_vendeur';
import vendeur_selected from './pages/achat/vendeur_selected';
import question_achat from './pages/achat/question_achat';
import montant from './pages/achat/montant';
import CodeAchat from './pages/achat/code_achat';
import detail_achat from './pages/achat/detail_achat';
import add from './pages/paiement/add';
import choix from './pages/paiement/choix';
import Confirmation from './pages/paiement/confirmation';
import Code from './pages/paiement/code';
import Notification from './pages/notification';
import WaitValidation from './pages/notification/wait_validation';
import ActivePaiement from './pages/notification/active_paiement';
import ModificationOffre from './pages/modification_offre';
import Validation from './pages/preparation_cmd/validation';
import Livraison from './pages/preparation_cmd/livraison';
import AttenteLivraison from './pages/preparation_cmd/attente_livraison';
import ConfirmColisRecu from './pages/preparation_cmd/confirm_colis_recu';
import NewLitige from './pages/litige/new_litige';
import SelectOffre from './pages/litige/select_offre';
import Assistance from './pages/litige/assistance';
import messenger from './pages/litige/messenger';
import Confidentialite from './pages/confidentialite';
import EditProfil from './pages/edit_profil';
import main from './pages/paiement/main';
import Avis from './pages/avis';
import ChangeCode from './pages/change_code';
import Compte from './pages/compte';
import Retrait from './pages/retrait';
import listes from './pages/notification/listes';
import ServiceLivreurScreen from './screens/ServiceLivreurScreen';
import ObtenirCodeScreen from './screens/ObtenirCodeScreen';

const Stack = createStackNavigator();
const customHeaderTitleStyle = {
  fontSize: 14,
  color: 'white',
};
const customHeaderStyle = {
  backgroundColor: '#3498db',
  height: 40,
};
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login1"
            component={login_1}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login2"
            component={login_2}
            options={headearNavigation('Modifier le numéro')}
          />
          <Stack.Screen
            name="Register"
            component={register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register2"
            component={register_2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register3"
            component={register_3}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register4"
            component={register_4}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Historique"
            component={Historique}
            options={{
              headerShown: true,
              headerTitle: 'Historique de transactions',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Encours"
            component={Encours}
            options={{
              headerShown: true,
              headerTitle: 'En cours',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="EncoursDetail"
            component={encours_detail}
            options={{
              headerShown: true,
              headerTitle: 'Détails',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Promotion"
            component={Promotion}
            options={{
              headerShown: true,
              headerTitle: 'Promotions et infos',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="PromotionExterne"
            component={PromotionExterne}
            options={{
              headerShown: true,
              headerTitle: 'Promotions externes',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="ServiceClient"
            component={service_client}
            options={{
              headerShown: true,
              headerTitle: 'Service client',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="ChoixVendeur"
            component={choix_vendeur}
            options={{
              headerShown: true,
              headerTitle: 'Propositions',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="VendeurSelected"
            component={vendeur_selected}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QuestionAchat"
            component={question_achat}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Montant"
            component={montant}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CodeAchat"
            component={CodeAchat}
            options={{
              headerShown: true,
              headerTitle: 'Code Achat',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="DetailAchat"
            component={detail_achat}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddPaiement"
            component={add}
            options={{
              headerShown: true,
              headerTitle: 'Moyen de paiement et de retrait',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="ChoixPaiement"
            component={choix}
            options={{
              headerShown: true,
              headerTitle: 'Choix de paiement',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="ConfirmationPaiement"
            component={Confirmation}
            options={{
              headerShown: true,
              headerTitle: 'Confirmation de paiement',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="CodePaiement"
            component={Code}
            options={{
              headerShown: true,
              headerTitle: 'Code secret',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="NotificationList"
            component={listes}
            options={{
              headerShown: true,
              headerTitle: 'Liste de notifications',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="WaitValidation"
            component={WaitValidation}
            options={{
              headerShown: true,
              headerTitle: "Validation d'une offre",
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="ActivePaiement"
            component={ActivePaiement}
            options={{
              headerShown: true,
              headerTitle: 'Activation de paiement',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="ModificationOffre"
            component={ModificationOffre}
            options={{
              headerShown: true,
              headerTitle: 'Modification',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />

          <Stack.Screen
            name="ValidationCommande"
            component={Validation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LivraisonCommande"
            component={Livraison}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AttenteLivraison"
            component={AttenteLivraison}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ColisRecu"
            component={ConfirmColisRecu}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NewLitige"
            component={NewLitige}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectOffre"
            component={SelectOffre}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Assistance"
            component={Assistance}
            options={{
              headerShown: true,
              headerTitle: 'Assistance technique',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Messenger"
            component={messenger}
            options={{
              headerShown: true,
              headerTitle: 'Messagerie',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Confidentialite"
            component={Confidentialite}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profil"
            component={main}
            options={{
              headerShown: true,
              headerTitle: 'Profil',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="EditProfil"
            component={EditProfil}
            options={{
              headerShown: true,
              headerTitle: 'Modifier profil',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Avis"
            component={Avis}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeCode"
            component={ChangeCode}
            options={{
              headerShown: true,
              headerTitle: 'Modifier code',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Compte"
            component={Compte}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Retrait"
            component={Retrait}
            options={{headerShown: false}}
          />

          {/**
           *
           * Partie integration
           *
           */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Notifications',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="NousContacter"
            component={NousContacterScreen}
            options={{
              headerShown: true,
              headerTitle: 'Nous contacter',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Parrainer"
            component={ParrainerScreen}
            options={{
              headerShown: true,
              headerTitle: 'Parrainage',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Partager"
            component={PartagerScreen}
            options={{
              headerShown: true,
              headerTitle: 'Partager',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Promotions"
            component={PromotionsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Promotions',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{
              headerShown: true,
              headerTitle: 'Menu',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="trouverLivreur"
            component={TrouverLivreurScreen}
            options={{
              headerShown: true,
              headerTitle: 'Livreur',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="serviceLivreur"
            component={ServiceLivreurScreen}
            options={{
              headerShown: true,
              headerTitle: 'Service livraison',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="ObtenirCode"
            component={ObtenirCodeScreen}
            options={{
              headerShown: true,
              headerTitle: 'Obtenir code',
              headerTitleStyle: customHeaderTitleStyle,
              headerStyle: customHeaderStyle,
              headerTintColor: 'white',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
