import React, {useEffect, useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { controllerUser } from './controller';
import Navbar from '../navbar/Navbar';
import logo from "../../assets/logo_smart_b.png";



// creame una interface para este estado const { purchase, setPurchase} = useState ([]) ; 
    interface items {
        title:string;
        id: string;
        unit_price: number;
        description: string;
        quantity: number;
    }

    interface preference {
    date_create: string,
    items: items[]   
    }

    interface Product {
        title: string;
        quantity: number;
        }


export const Dashboard_user = () => {

    const { user, isAuthenticated } = useAuth0();
    const [purchase, setPurchase] = useState<preference[]>([]);
    //purchase [{}, {}]

     const email= "arrascaetaefdev@gmail.com";
   

    useEffect( ()=> {
        const handleGetItems = async () => {
            const response = await controllerUser(email);
            //console.log(response) //array de dos elementos
            const mapeado = response.map( (dato:any) => {
                return {
                    date_created: dato.date_created,
                    items: dato.items
                }
            })
            setPurchase(mapeado)
        }
        if (isAuthenticated) {            
            handleGetItems();
        }
    }, [isAuthenticated])
     
    console.log(purchase)

  return (
    <div >
        <div className="home_topLanding">
        <div className="home_container_logo">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="home_container_navbar">
          <Navbar />
        </div>
            </div>

        <div className='all'>
            <div className='dash_profileContainer'>
                <div className='dash_profile_ImgSide'>
                    <img src={user?.picture} alt="picture-profile" />
                </div>
                <div className='dash_profile_InfoSide'>
                    <h2>{user?.name}</h2>
                    <p>{email}</p>
                </div>
            </div>

            <div className='dash_infouser_container'>
                <div className='dash_infouser_title'>
                    <img className='dash_infouser_imageMenu' src="https://icon-library.com/images/profile-png-icon/profile-png-icon-24.jpg" alt="profileInfo" />
                    <h2>My Information</h2>
                </div>
                    <p>Manage your personal data</p>
            </div>

            <div className='dash_purchaseDiv'>
                <div className='dash_purchaseTitleContainer'>
                    <img className='dash_purchase_iconMenu' src="https://icon-library.com/images/purchase-icon-png/purchase-icon-png-8.jpg" alt="cartPurchase"/>
                    <h2>My shopping</h2>
                </div>
                {
                    purchase.map( product => (
                        <div key={product.date_create} className='dash_Allpurchase_container'>
                                {
                                    product.items.map( sell => {
                                        return (
                                            <div className='dash_onePurchase'>
                                                <div className='dash_onePurchase_imageSide'>
                                                    <img className='imagePurchase' src="https://m.media-amazon.com/images/I/81OeBtkiVJL.AC_SL1500.jpg" alt="imgPurchase" />
                                                </div>
                                                <div className='dash_onePurchase_infoSide'>
                                                    <h3>{sell.title}</h3>
                                                    <p>Quantity: {sell.quantity}</p>
                                                    <p>Total: ${sell.unit_price * sell.quantity}</p>
                                                    <p>{product.date_create}</p>
                                                </div>
                                            </div>
                                        )
                                    } )
                                }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    )
}