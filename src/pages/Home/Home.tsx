import { useState } from "react";

import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import useClosePopupByTgButton from "../../hooks/useClosePopupByTgButton";

import classNames from "classnames/bind";
import useWindowSize from "../../hooks/useWindowSize";
const cn = classNames.bind(styles);

import Coins from "./modules/Coins";
import Liga from "./modules/Liga";
import styles from "./Home.module.scss";
import Energy from "./modules/Energy";
import Menu from "./modules/Menu";
import FarmBloks from "./modules/FarmBlocks/FarmBloks";
import Popup from "../../components/Popup/Popup";
import Button from "../../components/Button/Button";
import CoinWhiteBg from "../../components/CoinWhiteBg/CoinWhiteBg";
import PopupListWrap from "../../components/PopupList/modules/PopupListWrap";
import PopupListTabs from "../../components/PopupList/modules/PopupListTabs";
import PopupList from "../../components/PopupList/PopupList";
import BoostBlock from "../../components/BoostBlock/BoostBlock";
import CoinBlock from "../../components/CoinBlock/CoinBlock";
import Boosts from "./modules/Boosts/Boosts";
import Account from "./modules/Account";
import LigaBlock from "../../components/LigaBlock/LigaBlock";
import { closeBoostBuyPopup } from "../../store/reducers/boost";

const Home = () => {
   const dispatch = useDispatch();
   const { width } = useWindowSize();

   // Energy popup
   const [energyPopupOpen, setEnergyPopupOpen] = useState(false);
   const energyRef = useOutsideClick(
      () => setEnergyPopupOpen(false),
      ["#energy"]
   );

   // Buy Boost popup
   const boostState = useAppSelector((state) => state.boost);
   const boostBuyRef = useOutsideClick(
      () => dispatch(closeBoostBuyPopup()),
      ["#buyBoost"]
   );

   // Boost popup
   const [boostPopupOpen, setBoostPopupOpen] = useState(false);
   const boostRef = useOutsideClick(
      () => setBoostPopupOpen(false),
      ["#menu", "#tabs"]
   );
   useClosePopupByTgButton({
      isOpen: boostPopupOpen,
      closePopup: () => setBoostPopupOpen(false),
   });
   // Активный таб в boost popup
   const [activeTab, setActiveTab] = useState("BOOST");

   // Liga popup
   const [ligaPopupOpen, setLigaPopupOpen] = useState(false);
   const ligaRef = useOutsideClick(() => setLigaPopupOpen(false), ["#league"]);
   useClosePopupByTgButton({
      isOpen: ligaPopupOpen,
      closePopup: () => setLigaPopupOpen(false),
   });

   // True если хотя бы один попап открыт
   // но кроме попапа Energy!
   const isPopupOpen = boostPopupOpen || ligaPopupOpen;

   return (
      <div className={cn("wrap")}>
         <div className={cn("top")}>
            <Account
               nickname="dimamrkv"
               imgSrc={"img/pages/people/person.png"}
            />
            <Coins quantity={"349.917"} />
            <Liga liga="Diamond" onLigaOpen={() => setLigaPopupOpen(true)} />
         </div>

         {!isPopupOpen && (
            <div className={cn("bottom")}>
               <Energy
                  total={1000}
                  current={300}
                  onClick={() => setEnergyPopupOpen(true)}
               />
               <Menu onBoostOpen={() => setBoostPopupOpen(true)} />
            </div>
         )}

         {/* Элементы фона */}
         <div className={cn("bg-elements")}>
            <img src="img/pages/home/home-bg.svg" alt="road" />

            {/* Блоки земли */}
            <FarmBloks />

            {/* Активные boosts */}
            <Boosts />
         </div>

         {/* Energy popup */}
         <Popup
            borderlabel="Energy"
            isOpen={energyPopupOpen}
            onClose={() => setEnergyPopupOpen(false)}
            ref={energyRef}>
            <div className={cn("popup__body")}>
               {/* Молнии на заднем фоне */}
               <div className={cn("popup__bg-lightnings")}>
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
               </div>

               {/* Главная иконка молнии */}
               <img
                  src="img/pages/home/energy/energy.svg"
                  className={cn("popup__icon")}
                  alt="energy"
               />

               <span className={cn("popup__level")}>Level 7</span>

               <div className={cn("popup__bottom")}>
                  <div className={cn("popup__earning")}>
                     <span>+500/h</span>
                     <img src="img/pages/home/energy/energy.svg" alt="energy" />
                  </div>

                  <Button
                     className={cn("popup__btn")}
                     size={width > 380 ? "big" : "normal"}>
                     <CoinWhiteBg
                        iconName="BTC"
                        size={width > 380 ? "normall" : "small"}
                     />
                     <span>10 000</span>
                  </Button>
               </div>
            </div>
         </Popup>

         {/* Boost popup */}
         <Popup
            borderlabel={boostState.info.name}
            isOpen={boostState.isOpen}
            onClose={() => dispatch(closeBoostBuyPopup())}
            ref={boostBuyRef}>
            <div className={cn("popup__body")}>
               <div className={cn("popup__bg-lightnings")}>
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
                  <img src="img/global/lightning.svg" alt="energy" />
               </div>

               <img
                  src={boostState.info.imgSrc}
                  className={cn("popup__icon", "_boost")}
               />

               <div className={cn("popup__bottom")}>
                  <div className={cn("popup__earning")}>
                     <span>+{boostState.info.earning}/h</span>
                     <img src="img/pages/home/energy/energy.svg" alt="energy" />
                  </div>

                  <Button
                     className={cn("popup__btn")}
                     size={width > 380 ? "big" : "normal"}>
                     <CoinWhiteBg
                        iconName="BTC"
                        size={width > 380 ? "normall" : "small"}
                     />
                     <span>{boostState.info.price}</span>
                  </Button>
               </div>
            </div>
         </Popup>

         {/* BOOST popup */}
         <PopupListWrap isOpen={boostPopupOpen}>
            <PopupListTabs
               labels={["BOOST", "COINS"]}
               activeTab={activeTab}
               onTabChange={(label) => setActiveTab(label)}
            />
            {activeTab === "BOOST" ? (
               <PopupList
                  ref={boostRef}
                  nodes={[
                     <BoostBlock
                        boostName="mill"
                        earning={"500"}
                        price="10 000"
                        ligaName="Wooden"
                     />,
                     <BoostBlock
                        boostName="drone"
                        earning={"500"}
                        price="15 000"
                        ligaName="Silver"
                     />,
                     <BoostBlock
                        boostName="minicar"
                        earning={"500"}
                        price="30 000"
                        ligaName="Gold"
                     />,
                     <BoostBlock
                        boostName="car-2"
                        earning={"500"}
                        price="40 000"
                        ligaName="Fire"
                     />,
                     <BoostBlock
                        boostName="car-3"
                        earning={"500"}
                        price="70 000"
                        ligaName="Diamond"
                     />,
                  ]}
               />
            ) : (
               <PopupList
                  ref={boostRef}
                  nodes={[
                     <CoinBlock
                        coinName="BTC"
                        earning="200"
                        price="10 000"
                        isBought
                        isActive
                     />,
                     <CoinBlock
                        coinName="Polkadot"
                        earning="500"
                        price="15 000"
                        isBought
                     />,
                     <CoinBlock
                        coinName="TON"
                        earning="700"
                        price="20 000"
                        isBlocked
                     />,
                     <CoinBlock
                        coinName="Binance"
                        earning="1 000"
                        price="30 000"
                     />,
                     <CoinBlock
                        coinName="Polkadot"
                        earning="2 000"
                        price="35 000"
                     />,
                     <CoinBlock
                        coinName="Solana"
                        earning="5 000"
                        price="50 000"
                     />,
                     <CoinBlock
                        coinName="ETHerium"
                        earning="10 000"
                        price="40 000"
                     />,
                     <CoinBlock
                        coinName="XRP"
                        earning="20 000"
                        price="80 000"
                     />,
                  ]}
               />
            )}
         </PopupListWrap>

         {/* LEAGUES popup */}
         <PopupListWrap isOpen={ligaPopupOpen}>
            <PopupList
               ref={ligaRef}
               nodes={[
                  <LigaBlock
                     ligaName="Wooden"
                     percent={100}
                     price="5 000"
                     acitve={true}
                  />,
                  <LigaBlock
                     ligaName="Silver"
                     percent={0}
                     price="25 000"
                     acitve={false}
                  />,
                  <LigaBlock
                     ligaName="Gold"
                     percent={20}
                     price="100 000"
                     acitve={false}
                  />,
                  <LigaBlock
                     ligaName="Fire"
                     percent={10}
                     price="1 000 000"
                     acitve={false}
                  />,
                  <LigaBlock
                     ligaName="Diamond"
                     percent={5}
                     price="2 500 000"
                     acitve={false}
                  />,
               ]}
            />
         </PopupListWrap>
      </div>
   );
};

export default Home;
