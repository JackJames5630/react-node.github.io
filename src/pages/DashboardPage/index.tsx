/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import * as anchor from '@project-serum/anchor';
import { useConnection, useAnchorWallet, useWallet, AnchorWallet } from "@solana/wallet-adapter-react";
import {
    // useWalletModal,
    WalletModal
} from "@solana/wallet-adapter-react-ui";
import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { useToasts } from 'react-toast-notifications'
import { 
    PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY,
  } from '@solana/web3.js';
import CONFIG from '../../config';
import { IDL } from '../../constants/idl/solch_staking_contract'
import {getCurrentChainTime, getImg, getProvider, makeATokenAccountTransaction} from './../../utils/Helper'
import './index.css';
import { sendTransactions } from '../../helpers/sol/connection';
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { BsTelegram, BsTwitter, BsInstagram} from 'react-icons/bs'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import Table from '../../components/Table'
import axios from 'axios';
import styled, {css} from 'styled-components';
const { REWARDS, TOTAL_REWARD, POOLTYPES, BASE_URL, DAY_TIME, POOLSEEDS, POOL_DATA_SEEDS, POOL_SIGNER_SEEDS, PROGRAM_ID, REWARD_TOKEN_ACCOUNT, REWARD_TOKEN_MINT, VAULT_SEEDS } = CONFIG;

const DECIMAL = 1000000000;
const useStyles = makeStyles((theme: Theme) => 
 createStyles({
    header: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
    },
    layout: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
    },
    button: {
        color: '#FFFFFF',
        backgroundColor: theme.palette.primary.light,
    },
    firstButton: {
        border: theme.palette.common.white,
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.primary.light,
    },
    valueDiv: {
        backgroundColor: theme.palette.secondary.light,
    },
    calculatorDiv: {
        background: theme.palette.secondary.main,
        height: 730,
        border: theme.palette.secondary.dark,
        boxSizing: 'border-box',
        backdropFilter: 'blur(8px)',
        borderRadius: 20
    },
    footer: {
        background: theme.palette.background.paper,
        color: theme.palette.text.secondary
    },

    icon: {
        // marginTop: 12,
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    iconLabel: {
        width: 100
    },
    poolDiv: {
        background: theme.palette.secondary.main,
        paddingBottom: 65,
        border: theme.palette.secondary.dark,
        boxSizing: 'border-box',
        backdropFilter: 'blur(8px)',
        borderRadius: 20,
        marginTop: 150
    },
    boardDiv: {
        background: theme.palette.secondary.main,
        border: theme.palette.secondary.dark,
        boxSizing: 'border-box',
        backdropFilter: 'blur(8px)',
        borderRadius: 20,
        marginTop: 150,
        paddingBottom: 20
    },
    innerDivText: {
        color: theme.palette.text.primary
    },
    contentDiv: {
        background: theme.palette.background.paper,
        border: theme.palette.secondary.contrastText
    },
    amountDiv: {
        border: theme.palette.secondary.dark,
        color: theme.palette.text.primary
    },
    inputDiv: {
        color: theme.palette.text.secondary,
        fontSize: 25,
        lineHeight:33,
        fontWeight: 600,
        justifyContent: 'space-between'
    },
    inputBox: {
        color: theme.palette.text.secondary,
        background: theme.palette.background.paper
    },
    cardDiv: {
        background: theme.palette.background.paper,
        border: theme.palette.secondary.contrastText,
        color: theme.palette.text.secondary

    },
    thirdCard: {
        border: '1px solid #DBA656',
        
        background: theme.palette.background.default
    },
    labelDiv: {
        color: '#DBA656',
    },
    innerButtonDiv: {
        color: theme.palette.text.primary,
        border: '1px solid #DBA656  ',
    },
    topDiv: {
        background: 'rgba(219, 166, 86, 0.7)',
        backdropFilter: `blur(8px)`,
        borderRadius: `20px 20px 0px 0px`,
        height: 13,
        marginBottom: 15
    },
    fourthDiv: {
        background: theme.palette.text.primary,
        backdropFilter: `blur(8px)`,
        borderRadius: `20px 20px 0px 0px`,
        height: 13,
        marginBottom: 15,
    },
    fifthDiv: {
        background: `rgba(252, 220, 105, 0.7)`,
        backdropFilter: `blur(8px)`,
        borderRadius: `20px 20px 0px 0px`,
        height: 13,
        marginBottom: 15,
    },
    fifthDivLight: {
        background: `rgba(224, 185, 44, 0.7)`,
        backdropFilter: `blur(8px)`,
        borderRadius: `20px 20px 0px 0px`,
        height: 13,
        marginBottom: 15,
    },
    fifthInner: {
        border: '1px solid rgba(252, 220, 105, 0.7)',
        color: theme.palette.text.primary,

    },
    fifthLabel: {
        color: `rgba(252, 220, 105)`
    },
    fifthLabelLight: {
        color: `#E0B92C`
    },
    fifthCard: {
        border: '1px solid rgba(252, 220, 105, 0.7)',
        background: theme.palette.background.default
    },
    modalButton: {
        color: theme.palette.text.primary,
        border: theme.palette.secondary.contrastText
    },
    tableCell: {
        background: theme.palette.background.paper,
        color: theme.palette.primary.dark
    },
    fontColor: {
        color: theme.palette.primary.dark 
    },
    coloredCell: {
        background: theme.palette.common.black,
    }

 })
)
const WrapperImage = styled.div`
${(props: {mode: any}) => {
    switch(props.mode){
        case 1: 
        return css`
        display: none;
        `;
        case 0:
            return css`
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 850px;
            background-image: url("assets/img/back.png");
            background-repeat: no-repeat;
            background-size: cover;
        `; 
    }
}}
    @media(max-width: 900px) {
        display: none;
    }
`

const Logo = styled.img`
`

const TextDiv = styled.div`
`
const DashboardPage = (props: any) => {

    const wallet = useAnchorWallet();
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const walletState = useWallet()
    // const {setVisible, visible} = useWalletModal();
    const [visible, setVisible] = useState(true);
    const { connection } = useConnection();
    const { addToast } = useToasts();
    const themeMode = useSelector((state: any) => state.themeReducer.themeMode);
    const classes = useStyles(props);
    const [totalLockedValue, setTotalLockedValue] = useState(0);
    const [totalTradingValue, setTotalTradingValue] = useState(0);
    const [availableRewardAmount, setAvailableRewardAmount] = useState<any>([]);
    const [amount, setAmount] = useState<number>();
    const [result, setResult] = useState(0);
    const [lockedTime, setLockedTime] = useState('');
    const [open, setOpen] = useState(false);
    const [cardState4, setCardState4] = useState(0);
    const [cardState3, setCardState3] = useState(0);
    const [cardState2, setCardState2] = useState(0);
    const [cardState1, setCardState1] = useState(0);
    const [cardState0, setCardState0] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [walletBalance, setWalletBalance] = useState(0);
    const [userData, setUserData] = useState<any>([]);
    const [cardData, setCardData] = useState<any>({});
    const [maxAmount, setMaxAmount] = useState<any>([]);
    const [intervalId, setIntervalId] = useState(0);
    const [calcIndex, setCalcIndex] = useState(-1);
    const BUTTON_STYLE =  'background: linear-gradient(261.78deg, #14F195 -1.89%, #9945FF 99.57%)';
    const DEFAULT_STYLE = 'background: none';
    const [fadeStatus, setFadeStatus] = useState(false);//fade in true; fade out false;
    const [mouseId, setMouseId] = useState(0);
    useEffect(() => {
        if (!walletState.connected) {
            setCardState0(0);
            setCardState1(0);
            setCardState2(0);
            setCardState3(0);
            setCardState4(0);
            let endTime = Date.now()
            let year = new Date(endTime).getFullYear();
            let month = new Date(endTime).getMonth() + 1;
            let day = new Date(endTime).getDate();
            let lockTime = month > 9 ? `${day}/${month}/${year}`: `${day}/0${month}/${year}`;
            setLockedTime(lockTime);
        } else {
            setVisible(false);
            setCardState0(1);
            setCardState1(1);
            setCardState2(1);
            setCardState3(1);
            setCardState4(1);
        }
    }, [walletState.connected]);

    useEffect(() => {
        (async() => {
          if( walletState.connected && walletState.connecting) {
            setLoading(true);
            setLoadingText('Loading...');
            setVisible(false);
            await reloadPage();
            setLoading(false);
            
          }
        })()
          return () => {
          }
        }, [wallet?.publicKey]);

    useEffect(() => {
        if ( window.scrollY === 0) {
            window.clearInterval(mouseId);
            setFadeStatus(true);
            getMouseEvent();
        }
    }, [window.scrollY])

    const reloadPage = async () => {
        if ( !wallet ) return;
        await getTotalTradingVolume()
        await getStakedInfo();
        await getWalletBalance();
        await getBoardInfo();
        await updateCardData();
        await getMouseEvent()
    }
    const getMouseEvent = async() => {
        const mouseID = window.setInterval(() => {
            if ( window.scrollY > 0) setFadeStatus(false);
            else setFadeStatus(true);
        }, 5000);
        setMouseId(mouseID);
    }
    const getTotalTradingVolume = async () => {
        if (!wallet) return;
        const provider = getProvider(connection, wallet as AnchorWallet);
        const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
        
        let [poolData, nonce_pool] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(POOL_DATA_SEEDS)],
            program.programId
        );
        try {
            let infoBefore = await connection.getAccountInfo(poolData);
            if (!infoBefore) return;
            const poolDataInfo = await program.account.data.fetch(poolData);
            if ( poolDataInfo)  {
                let totalLockedValue = Number.parseFloat(poolDataInfo.totalLockedAmount.toString())/DECIMAL;
                let RoundTotalLockedValue = Math.round(totalLockedValue);
                setTotalLockedValue(RoundTotalLockedValue);// we should convert this to dollar using api
                let rewardInfo: any = poolDataInfo.rewardInfo;
                setAvailableRewardAmount(rewardInfo);
                let maxLimit : any[] = [];
                for ( let i = 0; i< 5; i++) {
                    let maxAm = Number.parseFloat(rewardInfo[i].maxAmount.toString())/ DECIMAL;
                    maxLimit.push(maxAm);
                }
                setMaxAmount(maxLimit);
            }
        }catch(err) {
            console.log(err);
            setLoading(false)
            return;
        }
    }
    const updateBoardData = async () => {
        if ( !wallet) return;
            if ( localStorage.getItem("index") === null) return
            let index = parseInt(localStorage.getItem("index")!, 10)
            await updateBoardInfo(wallet.publicKey.toString(), index);
    }
    const updateCardData = async() => {
        if ( !wallet) return;
        window.clearInterval(intervalId);
        const intervalid = window.setInterval(async() => {
            await getTotalTradingVolume()
            await getStakedInfo()
        }, 10 * 1000);
        setIntervalId(intervalid);
    }
    const getStakedInfo = async () => {
        if (!wallet) return;
        const provider = getProvider(connection, wallet as AnchorWallet);
        const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
        let data: any = {};
        for ( let i = 0; i< 5 ; i++) {
            let [pool, nonce_pool] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(POOLSEEDS + i), wallet.publicKey.toBuffer()],
            program.programId
            );
            try {
                let infoBefore = await connection.getAccountInfo(pool);
                if (!infoBefore) continue;
                const info = await program.account.pool.fetch(pool);
                let total = Number.parseFloat(info.stakedAmount.toString())/DECIMAL;
                let index = info.index;
                if (info) {
                    if ( total > 0 ) {
                    const current = await getCurrentChainTime(connection);
                    let lifeTime = info.endTime > current! ? current! - info.startTime: info.endTime - info.startTime;
                    let unit = total * POOLTYPES[index].apy / POOLTYPES[index].days / DAY_TIME / 100;
                    let reward = lifeTime * unit;
                    let curTime = current!;
                    data[info.index] = {index: index, total: total, reward: reward, startTime: info.startTime, endTime: info.endTime, curTime: curTime};
                    let localIndex = localStorage.getItem("index");
                    
                    if ( localIndex !== null && localIndex === i.toString()) {
                        changeState(i, 2);
                    }
                    }
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
                continue
            }
        }
        setCardData(data);
        console.log("cardData is changing...", data)
        
    }
        
    const getBoardInfo = async() => {
        try {
            const result = await axios.request({
                method: 'GET',
                url: `${BASE_URL}/user`
            });
            if (result.data.success) {
                setUserData(result.data.data);
            } else {
                console.log("error:")
                setLoading(false);
            }
            
        } catch (error) {
            console.log("error: ", error);
            setLoading(false)
            return;
        }
        
        
    } 

    const getWalletBalance = async () => {
        if (wallet) {
          let result: any 
          try {
            result = await connection.getTokenAccountsByOwner(wallet.publicKey, {
                mint: new PublicKey(REWARD_TOKEN_MINT),
                programId: new PublicKey(PROGRAM_ID),
            });
          } catch(err) {
            console.log("error: ", err);
            addToast(`${err}`,{
              appearance: 'error',
              autoDismiss: true
            });
            setLoading(false);
            return;
          }
          if (result.value.length ===0 ) {
            addToast(`Change your wallet`,{
                appearance: 'error',
                autoDismiss: true
            });
            setLoading(false);
            return;
          }
          let tokenAccount = result.value[0].pubkey;
          try {
            let tokenAmount = await connection.getTokenAccountBalance(new PublicKey(tokenAccount));
            let balance = tokenAmount.value.uiAmount;
            setWalletBalance(balance!);
          }catch (err) {
            console.log("error: ", err);
            addToast(`${err}`,{
              appearance: 'error',
              autoDismiss: true
            });
            setLoading(false);
            return;
          }
        }
    }

    const onStake = async (value: any) => {

        if (currentIndex === -1) {
            addToast("Select Right Pool!", {
                appearance: 'warning',
                autoDismiss: true
            })
            return
        }//change LP token role to wallet token
        if ( walletBalance === 0 ) {
            addToast("Change your wallet !", {
                appearance: 'warning',
                autoDismiss: true
            })
            return
        }

        if ( walletBalance < value ) {
            addToast("Input valid amount in your wallet!", {
                appearance: 'warning',
                autoDismiss: true
            })
            return
        }
        setLoading(true);
        setLoadingText('Staking...');
        window.clearInterval(intervalId);
        const provider = getProvider(connection, wallet as AnchorWallet);
        const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
        
        if ( !wallet ) {
            addToast("Connect your wallet !", {
                appearance: 'warning',
                autoDismiss: true
            })
            setLoading(false);
            return
        }
        if ( value === 0 ) {
            addToast("Input valid LP token amount!",{
              appearance: 'warning',
              autoDismiss: true
            });
            setLoading(false);
            return;
        } 
        window.clearInterval(intervalId);
        let transaction: any = [];
        let signers: any = [];
        let instructionSet: any = [];
        let signerSet: any = [];

        let [poolSigner, nonce_signer] = await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from(POOL_SIGNER_SEEDS), wallet.publicKey.toBuffer()
        ], program.programId);


        let [pool, nonce_pool] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(POOLSEEDS + currentIndex), wallet.publicKey.toBuffer()],
            program.programId
        );

        let [poolData, nonceData] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(POOL_DATA_SEEDS)],
        program.programId
        );

        let result: any
        try {
            result = await connection.getAccountInfo(poolSigner);
        } catch (error) {
            console.log(error);
            addToast(`${error}`, {
                appearance: 'error',
                autoDismiss: true
            })
            setLoading(false);
            return;
        }
        try {
            if ( result === null) {
                const instruction = await program.instruction.createPoolSigner(nonce_signer, {
                    accounts: {
                      poolSigner: poolSigner,
                      user: wallet.publicKey,
                      systemProgram: SystemProgram.programId
                    },
                });
                transaction.push(instruction); 
            }
        } catch (error) {
            console.log(error);
            addToast(`${error}`, {
                appearance: 'error',
                autoDismiss: true
            })
            setLoading(false);
            return;
        }
        
        try {
            result = await connection.getAccountInfo(pool);
        } catch (error) {
            console.log(error);
            addToast(`${error}`, {
                appearance: 'error',
                autoDismiss: true
            })
            setLoading(false);
            return;
        }

        try {
            if ( result === null) {
                const instruction = await program.instruction.createPool(nonce_pool, currentIndex, {
                    accounts: {
                      pool: pool,
                      user: wallet.publicKey,
                      systemProgram: SystemProgram.programId
                    },
                  });
                transaction.push(instruction); 
            }
        } catch (error) {
            console.log(error);
            addToast(`${error}`, {
                appearance: 'error',
                autoDismiss: true
            })
            setLoading(false);
            return;
        }
//rewared token account
        let makeRewardAtaTx: any;
        try {
          makeRewardAtaTx = await makeATokenAccountTransaction(connection, wallet.publicKey, wallet.publicKey, new PublicKey(REWARD_TOKEN_MINT));
          if ( makeRewardAtaTx.instructions.length !==0 )  {
            transaction = [...transaction, ...makeRewardAtaTx.instructions];
            signers = [...makeRewardAtaTx.signers];
          }
        } catch (error) {
            console.log(error);
            addToast(`${error}`, {
                appearance: 'error',
                autoDismiss: true
            })
            setLoading(false);
            return;
        }
        let rewardTokenAccount = makeRewardAtaTx.tokenTo;

        let makeStakeTx: any;
        try {
          makeStakeTx = await makeStakeTransaction(value, program, poolSigner, pool, new PublicKey(REWARD_TOKEN_MINT), rewardTokenAccount);
        } catch (error) {
          console.log(error);
            addToast(`${error}`, {
                appearance: 'error',
                autoDismiss: true
            })
            setLoading(false);
            return;
        }

        if (makeStakeTx?.instructions.length !==0 ) {
            transaction = [...transaction, ...makeStakeTx.instructions];
            signers = [...signers, ...makeStakeTx.signers];
        }

        instructionSet.push(transaction);
        signerSet.push(signers);
        try {
            window.clearInterval(intervalId);
            await sendTransactions(connection, wallet, instructionSet, signerSet);
        } catch (error) {
            addToast("Staking failed!",{
              appearance: 'error',
              autoDismiss: true
            });
            setLoading(false);
            console.log("error: ", error);
            return;
        }

        
        await getStakedInfo()
        await getTotalTradingVolume();
        setLoading(false)
        addToast("Staking success!",{
            appearance: 'success',
            autoDismiss: true
        });
    
        await addUserToDB(wallet.publicKey.toString(), currentIndex, value);
        await getBoardInfo();
        changeState(currentIndex, 2);
        await updateCardData()


    }
    //changed to RewardTokenAccount
    const makeStakeTransaction = async (value: any, program:anchor.Program<any>,  poolSigner: PublicKey, pool: PublicKey, mint: PublicKey, tokenFrom: PublicKey ) => {
        let instructions: any = [];
        let signers: any = [];

        if ( !wallet ) return
        let [poolData, _nonceData] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(POOL_DATA_SEEDS)],
              program.programId
        );

        let makeAtokenAccount = await makeATokenAccountTransaction(connection, wallet.publicKey, poolSigner, mint);
        if (makeAtokenAccount.instructions.length !==0) {
          instructions = [...makeAtokenAccount.instructions];
          signers = [...makeAtokenAccount.signers];
        }

        let tokenTo = makeAtokenAccount.tokenTo;
        let tokenAmountToSend = (value - Math.floor(value)) * DECIMAL;
        instructions.push(program.instruction.stake( Math.floor(value) , tokenAmountToSend, currentIndex, {
            accounts: {
              user: wallet.publicKey,
              data: poolData,
              pool: pool,
              tokenFrom: tokenFrom,
              tokenTo: tokenTo,
              mint: mint,
              tokenProgram: TOKEN_PROGRAM_ID,
            },
            signers
        }));
        return {instructions, signers, tokenTo}

    }

    const onConnect = async (index: number, state: any ) => {
        setCurrentIndex(index);
        localStorage.removeItem("index");
        localStorage.setItem("index", index.toString());
        let nextState = state + 1;
        if ( state === 0 ) {
            if ( walletState.connected) {
                changeState(index, nextState);
                if ( cardData[index]!==undefined && cardData[index].total > 0 ) {
                    changeState(index, 2);
                }
            } else {
                setVisible (true);
            }
        } else if ( state === 1) {
            setOpen(true);
        } else {
            await onUnstake(index)
        }
    }    
    const changeState = (index: number, state: any) => {
        switch (index) {
            case 0:
            setCardState0(state);
            break;
            case 1:
            setCardState1(state);

            break;
            case 2:
            setCardState2(state);
            
            break;
            case 3:
            setCardState3(state);
            
            break;
            case 4: 
            setCardState4(state);
            break;
        };
    }   
    
    const onClick = () => {
    }

    const onClaim = async (index: any) => {
        setCurrentIndex(index);
        localStorage.removeItem("index");
        localStorage.setItem("index", index.toString());
        if ( !wallet ) {
            addToast("Connect your wallet!", {
              appearance: 'warning',
              autoDismiss: true,
            })
            return;
        }

        /*
        check if can claim
        */ 
       window.clearInterval(intervalId);

        setLoading(true);
        setLoadingText('Claiming');

        const provider = getProvider(connection, wallet as AnchorWallet);
        const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
        
        let instructionSet: any = [];
        let signerSet: any = [];
        let transaction: any = [];
        let signers: any = [];

        let makeRewardAtaTx: any;
        try {
          makeRewardAtaTx = await makeATokenAccountTransaction(connection, wallet.publicKey, wallet.publicKey, new PublicKey(REWARD_TOKEN_MINT));
          if ( makeRewardAtaTx.instructions.length !==0 )  {
            transaction = [...makeRewardAtaTx.instructions];
            signers = [...makeRewardAtaTx.signers];
          }
        } catch (error) {
            console.log(error);
            addToast(`${error}`, {
                appearance: 'error',
                autoDismiss: true
            })
            setLoading(false);
            return;
        }

        let makeClaimTx: any;
        try {
          makeClaimTx = await makeClaimTransaction(makeRewardAtaTx.tokenTo, index);
        } catch (error) {
          console.log("error: ", error);
          setLoading(false);
        }
        if ( makeClaimTx.instructions.length !==0 ) {
            transaction = [...transaction, ...makeClaimTx.instructions];
        } else {
            addToast("Claiming failed!",{
                appearance: 'error',
                autoDismiss: true
            });
            setLoading(false);
            return;
        }
        instructionSet.push(transaction);
        signerSet.push(signers);
        try {
            const result = await sendTransactions(connection, wallet, instructionSet, signerSet);
            if (!result.success) {
                addToast("Claiming failed!",{
                    appearance: 'error',
                    autoDismiss: true
                });
                setLoading(false);
                return;
            } else {
                
                await getStakedInfo();
                setLoading(false)
                addToast("Claiming success!",{
                    appearance: 'success',
                    autoDismiss: true
                });
                await updateBoardData()
                await getBoardInfo()
                await updateCardData()
            }
        }catch (err) {
            console.log(err);
            setLoading(false)
            addToast("Claiming failed!",{
                appearance: 'error',
                autoDismiss: true
            });
            setLoading(false);
            return;
        }
    }
    //change to rewardToken
    const makeClaimTransaction = async (rewardTo: PublicKey, index: number) => {
        const provider = getProvider(connection, wallet as AnchorWallet);
        const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
        let instructions: any = [];
        try {
          let [vault, _nonceValut] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(VAULT_SEEDS)],
            program.programId
          );
          let [pool, nonce_pool] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(POOLSEEDS + index), wallet!.publicKey.toBuffer()],
            program.programId
          );
      
          let [poolData, nonceData] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(POOL_DATA_SEEDS)],
            program.programId
          );

          let infoBefore = await connection.getAccountInfo(poolData);
          if (!infoBefore) return {instructions};
          infoBefore = await connection.getAccountInfo(pool)
          if (!infoBefore) return {instructions};
          instructions.push(
            program.instruction.claim(_nonceValut, {
              accounts: {
                pool: pool, 
                vault: vault,
                user: wallet!.publicKey,
                data: poolData,
                rewardFrom: new PublicKey(REWARD_TOKEN_ACCOUNT),
                rewardTo: rewardTo,
                tokenProgram: TOKEN_PROGRAM_ID
              }
            })
          );
        } catch (error) {
          console.log("error: ", error);
          setLoading(false);
        }
        return {instructions};
      }

    const onUnstake = async (index: number) => {
        setCurrentIndex(index);
        if ( !wallet ) {
            addToast("Connect your wallet !", {
                appearance: 'warning',
                autoDismiss: true
            })
            return
        }
        if (!localStorage.getItem("index")) {
            return;
        }
        window.clearInterval(intervalId);

        setLoading(true);
        setLoadingText('Unstaking...');
        const provider = getProvider(connection, wallet as AnchorWallet);
        const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
        
        let instructionSet: any = [];
        let signerSet: any = [];
        let transaction: any = [];
        let signers: any = [];


        let makeRewardAtaTx: any;
        try {
          makeRewardAtaTx = await makeATokenAccountTransaction(connection, wallet.publicKey, wallet.publicKey, new PublicKey(REWARD_TOKEN_MINT));
          if ( makeRewardAtaTx.instructions.length !==0 )  {
            transaction = [...makeRewardAtaTx.instructions];
            signers = [...makeRewardAtaTx.signers];
          }
        } catch (error) {
            console.log(error);
            addToast(`${error}`, {
                appearance: 'error',
                autoDismiss: true
            })
            setLoading(false);
            return;
        }

        let rewardTokenAccount = makeRewardAtaTx.tokenTo;


        let makeUnstakeTx: any;
        try {
            makeUnstakeTx = await makeUnstakeTransaction(program, rewardTokenAccount, new PublicKey(REWARD_TOKEN_MINT), index);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

        transaction = [...transaction, ...makeUnstakeTx.instructions];
        if ( makeUnstakeTx.signers.length !==0) {
            signers = [...signers, ...makeUnstakeTx.signers];
        }
        instructionSet.push(transaction);
        signerSet.push(signers);

        try {
            await sendTransactions(connection, wallet, instructionSet, signerSet);
          } catch (error) {
            console.log("error: ", error);
            setLoading(false);
            addToast("Unstaking failed!",{
              appearance: 'error',
              autoDismiss: true
            });
            return;
        }
        
        await getStakedInfo()
        setLoading(false)
        addToast("Unstaking success!",{
            appearance: 'success',
            autoDismiss: true
        });
        await updateBoardData()
        await getBoardInfo()
        await updateCardData()
        changeState(currentIndex, 1)
    }

    const makeUnstakeTransaction = async (program: anchor.Program<any>, rewardTo: PublicKey, lpTokenMint: PublicKey, index: number) => {
        let instructions: any = [];
        let signers: any = [];

        let [poolData, _nonceData] = await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from(POOL_DATA_SEEDS)],
            program.programId
        );
        let [pool, nonce_pool] = await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from(POOLSEEDS + index), wallet!.publicKey.toBuffer()],
          program.programId
        );
        let [poolSigner, nonce_signer] = await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from(POOL_SIGNER_SEEDS), wallet!.publicKey.toBuffer()],
          program.programId
        )
        let [vault, _nonceValut] = await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from(VAULT_SEEDS)],
          program.programId
        );

        let infoBefore = await connection.getAccountInfo(poolData);
        if (!infoBefore) return;
        infoBefore = await connection.getAccountInfo(pool)
        if (!infoBefore) return;
        infoBefore = await connection.getAccountInfo(poolSigner);
        if (!infoBefore) return;
        infoBefore = await connection.getAccountInfo(vault)
        if (!infoBefore) return;
    
        let makeLPtokenAtaTx: any;
        let tokenFrom: any;
        try {
          makeLPtokenAtaTx = await makeATokenAccountTransaction(connection, wallet!.publicKey, poolSigner, lpTokenMint);
          if ( makeLPtokenAtaTx.instructions.length !==0 )  {
            instructions = [...instructions, ...makeLPtokenAtaTx.instructions];
            signers = [...makeLPtokenAtaTx.signers];
          }
        } catch (error) {
          console.log("error occured when making LP Atoken account", error);
          setLoading(false);
        }
        tokenFrom = makeLPtokenAtaTx.tokenTo;
        instructions.push(
          program.instruction.unstake(nonce_signer, _nonceValut, {
            accounts: {
              pool: pool,
              poolSigner: poolSigner,
              vault: vault,
              user: wallet!.publicKey,
              data: poolData,
              rewardFrom: new PublicKey(REWARD_TOKEN_ACCOUNT),
              rewardTo: rewardTo,
              tokenFrom: tokenFrom,
              tokenTo: rewardTo,
              tokenProgram: TOKEN_PROGRAM_ID
            }
          })
        )
        return {instructions, signers};
    }



    const onCancel = () => {
        setOpen(false);
        setCurrentIndex(-1);
    }

    const onConfirm = async (value: any) => {
        setOpen(false);
        await onStake(value)
        setCurrentIndex(-1);
    }

    const addUserToDB = async (key: String, index: number, value: number) => {
        try {
            const result = await axios.request({
                method: 'POST',
                url: `${BASE_URL}`,
                data: {
                    user: key,
                    index: index,
                    amount: value
                }
            });
            console.log(result);
        } catch (error) {
            console.log(error);
            setLoading(false)
            return;
        }
        
    }

    const updateBoardInfo = async (key: String, index: number) => {
        try {
            const result = await axios.request({
                method: 'POST',
                url: `${BASE_URL}/update`,
                data: {
                    user: key,
                    index: index
                }
            })
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    const changeAmount = (e: any) => {
        let value = e;
        if (isNaN(value) || value < 0) {
            addToast('Input a valid Number!', {
              appearance: 'warning',
              autoDismiss: true
            })
            return ;
        }
        setAmount(value);
    }

    const onCalculate = (e: any, index: number) => {
        let parent = e.target.parentElement.children.length > 1 ? e.target.parentElement: e.target.parentElement.parentElement;
        for ( let i = 0; i< 5; i++) {
            let element = parent.children[i];
            element.style = DEFAULT_STYLE;
            if ( i === index) element.style = BUTTON_STYLE
        }
        setCalcIndex(index);
        if ( amount === undefined || amount === null) return;
            let expectedAmount = ( amount * ( 1 - POOLTYPES[index].fee / 100 ) ) * POOLTYPES[index].apy / 100;
            let rewardAmount = Math.floor(100 * expectedAmount)/100;
            setResult(rewardAmount);
            let endTime = Date.now() + POOLTYPES[index].days * 86400 * 1000;
            let year = new Date(endTime).getFullYear();
            let month = new Date(endTime).getMonth() + 1;
            let day = new Date(endTime).getDate();
            let lockTime = month > 9 ? `${day}/${month}/${year}`: `${day}/0${month}/${year}`;
            setLockedTime(lockTime);
    }

    const onButtonClick = () => {

    }
    
    const onConnectWallet = () => {
        if (!walletState.connected) {
            setVisible(true);
            console.log("connect clicked")
        }
    }

    const handleCapture = (e: any) => {
        window.clearInterval(mouseId);
        setFadeStatus(true);
        getMouseEvent();
    }

    return(
        <div className={`${classes.layout}`} onClick={(e) => handleCapture(e)} onMouseMoveCapture={(e) => handleCapture(e)} onScrollCapture={(e) => handleCapture(e)} onWheelCapture={(e) => handleCapture(e)}>
             {
                loading ?
                <div id="preloader"> 
                    { <div style={{paddingTop: '150px', fontSize: '50px'}}>{loadingText}</div>}
                </div> :
                <div id="preloader" style={{display: 'none'}}></div>
            }
            {visible ? <WalletModal  featuredWallets={4} logo={<Logo src={'assets/img/modalIcon.png'}/>} />: ''}
            <WrapperImage mode={themeMode} />
            <Modal open={open} classes={classes} index={currentIndex} total={availableRewardAmount} limit={maxAmount} onCancel={onCancel} onConfirm={(e: any) => onConfirm(e)}/>
            <Header className={`${classes.header}`} state={walletState.connected} onClick={onConnectWallet} fade={fadeStatus} scrollTop={window.scrollY} />
            <div className={`layout container`}>
                <div className='title text-center row div_group'>
                    <p className='big_title'>Earn Rewards By Staking Solana Cash</p>
                    <p className='sm_title'>(SOLCH)</p>
                    <p>First Decentralized P2P Payment System Deployed on Solana Network</p>
                    <div className='col-lg-3 col-xl-3 col-sm-12 col-md-12'></div>
                    <div className='btn_group col-lg-6 col-xl-6 col-sm-12 col-md-12 justify-content-evenly'>
                        <a href='https://www.certik.com/projects/solana-cash'><Button className={`link_btn colored_btn ${classes.button} mr_17 ml_17`} text={'Certik Audit'} onClick={onButtonClick}/></a>
                        <a href='https://solanacash.gitbook.io/solana-cash/abstract/what-is-solana-cash'><Button className={`link_btn ${classes.firstButton} ml_17 mr_17`} text={'Lite Paper'} onClick={onButtonClick}/></a>
                    </div>
                    <div className='col-lg-3 col-xl-3 col-sm-12 col-md-12'></div>
                </div>

                <div className='value_group row div_group'>
                    <div className=' col-sm-12 col-md-12 col-lg-12 col-xl-1'>
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-5 mt-3'>
                        <div className={`${classes.valueDiv} value_div text-center m-auto left_div`}>
                            <div>
                                <p className='value_label'>
                                    Total Value Locked
                                </p>              
                            </div>
                            
                            <div>
                                <p className='value'>
                                    {"$"}{" "}{totalLockedValue}
                                </p>    
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-5 mt-3'>
                        <div  className={`${classes.valueDiv} value_div text-center m-auto right_div`}>
                            <div>
                                <p className='value_label'>
                                    Total Trading Volume
                                </p>              
                            </div>
                            
                            <div>
                                <p className='value'>
                                    {"$"}{" "}{totalTradingValue}
                                </p>    
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-1'>
                    </div>
                </div>

                <div className='solana_div m-auto text-center div_group'>
                    <span className='left_label'>
                        Built On
                    </span>
                    <a href='https://solana.com'>
                        <span className={`right_label ${classes.fontColor}`}>
                        {" "}SOLANA
                        </span>
                    </a>
                    <a href='https://solana.com'>
                        <div className='colored_div' />
                    </a>
                </div>

                <div className='social_div row div_group'>
                    <div className='social_text text-center col-12'>
                        <p className=''>
                            Follow Us On Our Social Media For More Info
                        </p>
                    </div>
                    <div className='social_button div_group col-12 row'>
                        <div className='col-sm-12 col-md-12'></div>
                        <div className='telegram  col-sm-12 col-md-12 col-lg-4'>
                            <a href="https://t.me/solanacashappchat">
                                <div className='icon_div div_group align-items-center text-center'>
                                    <div className={`${classes.icon}`}>
                                        <BsTelegram />
                                        <span className={`${classes.iconLabel}`}>
                                            Telegram
                                        </span>
                                    </div>
                                
                                </div>
                            </a>
                        </div>
                        <div className='twitter col-sm-12 col-md-12 col-lg-4'>
                            <a href="https://Twitter.com/solanacash_io">
                                <div className='icon_div div_group align-items-center text-center'>
                                    <div className={`${classes.icon}`}>
                                        <BsTwitter />
                                        <span className={`${classes.iconLabel}`}>
                                            Twitter
                                        </span>
                                    </div>
                                </div>
                            </a>
                            
                        </div>
                        <div className='instagram  col-sm-12 col-md-12 col-lg-4'>
                            <a href='https://Instagram.com/solanacash_io'>
                                <div className='icon_div div_group align-items-center text-center'>
                                    <div className={`${classes.icon}`}>
                                        <BsInstagram />
                                        <span className={`${classes.iconLabel}`}>
                                            Instagram
                                        </span>
                                    </div>
                                </div>
                            </a>
                            
                                
                        </div>
                            
                        <div className='col-sm-12 col-md-12'></div>
                    </div>


                </div>

                <div className={`${classes.calculatorDiv} row div_group`}>
                    <div className='title_div text-center'>
                        <p>
                            Staking Calculator
                        </p>
                        <p className={`text_label ${classes.innerDivText}`}>
                            Calculate Your SOLCH Depending On The Amount Of Staked Tokens And Lock Time
                        </p>
                    </div>


                    <div className={`content_div ${classes.contentDiv}`}>
                        <div className={`amount_div ${classes.amountDiv}`}>
                            <div className='text-center input_div'>
                                <span className='text_label'>
                                    Enter Amount
                                </span>
                            </div>
                            <div className={`d-flex ${classes.inputDiv}`}>
                                <div className={`input_amount_div `}>
                                    <input type={`number`} className={`input_box ${classes.inputBox}`} value={amount} onChange={(e: any) => changeAmount(e.target.value)} />
                                </div>
                                <div className='input_unit_div'>
                                    <span>
                                        SOLCH    
                                    </span>  
                                </div>
                            </div>

                        </div>
                        <div className={'div_available div_group'}>
                            <div className={'m-auto'}>
                                <span>Available Balance: {" "}</span>
                                <strong>
                                    <span>
                                        {walletBalance}
                                    </span>
                                </strong>
                                <span>{" "}SOLCH</span>
                            </div>
                        </div>

                        
                        <div className='button_div d-flex justify-content-between'>
                            <div className={'day_button text-center'} onClick={(e: any) => onCalculate(e, 0)}>
                                <span className='day_label'>
                                    7D
                                </span>
                            </div>
                            <div className={'day_button text-center'} onClick={(e: any) => onCalculate(e, 1)}>
                                <span className='day_label'>
                                    30D
                                </span>
                            </div>
                            <div className={'day_button text-center'} onClick={(e: any) => onCalculate(e, 2)}>
                                <span className='day_label'>
                                    90D
                                </span>
                            </div>
                            <div className={'day_button text-center'} onClick={(e: any) => onCalculate(e, 3)}>
                                <span className='day_label'>
                                    180D
                                </span>
                            </div>
                            <div className={'day_button text-center'} onClick={(e: any) => onCalculate(e, 4)}>
                                <span className='day_label'>
                                    365D
                                </span>
                            </div>
                            
                        </div>
                        <div className={`answer_div ${classes.amountDiv} text-center`}>
                            <p className='static_label'>
                                ROI
                            </p>
                            <span className='result_text result'>
                                {result}{" "}
                            </span>
                            <span className='result_text'>
                            {"SOLCH"}
                            </span>
                            <p>
                            Locked Until {" "}{lockedTime}
                            </p>
                        </div>
                        <div className={`${classes.amountDiv} footer_div`}>
                            <span>
                                Calculated based on current rates. All figures are estimates provided for your convenience 
                                only, distributed propotionally among token holders
                            </span>
                        </div>
                    </div>
                
                </div>

                <div className={`${classes.poolDiv} poolDiv row div_group`}>
                    <div className='title_div text-center col-12'>
                        <p className=''>
                            Staking Pools
                        </p>
                    </div>
                    <div className=' d-flex justify-content-center row div_group first_card_div'>
                        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-4 mt-4'>
                            <Card data={cardData} label={'Lite Cash'} index={0} 
                            cardState={cardState0} className={`${classes.cardDiv}`} innerClass={classes.amountDiv}
                             onConnect={(index: number, state: any) => onConnect(index, state)} onClick={onClick} 
                             onClaim={(index:any ) =>onClaim(index)}/>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-4 mt-4'>
                            <Card data={cardData} label={'Stack Cash'} index={1}  
                            cardState={cardState1} className={`${classes.cardDiv}`} innerClass={classes.amountDiv} 
                            onConnect={(index: number, state: any) => onConnect(index, state)} onClick={onClick}
                             onClaim={(index:any ) =>onClaim(index)}/>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-4 mt-4'>
                            <Card data={cardData} label={'Cash Pot'} index={2} 
                            cardState={cardState2} 
                            className={`${classes.thirdCard}`} valueClass={classes.labelDiv} 
                            innerClass={classes.innerButtonDiv} topClass={classes.topDiv}
                             onConnect={(index: number, state: any) => onConnect(index, state)} 
                             onClick={onClick} onClaim={(index:any ) =>onClaim(index)}/>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-4 mt-4'>
                            <Card data={cardData} label={'Cash King'} index={3}  
                            cardState={cardState3} 
                            className={`${classes.cardDiv}`} innerClass={classes.amountDiv} topClass={classes.fourthDiv}
                             onConnect={(index: number, state: any) => onConnect(index, state)} onClick={onClick}
                              onClaim={(index:any ) =>onClaim(index)}/>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-4 mt-4'>
                            <Card data={cardData} label={'Moon Cash'} index={4} 
                            cardState={cardState4}
                             className={`${classes.fifthCard}`} valueClass={themeMode === 0 ? classes.fifthLabel : classes.fifthLabelLight} innerClass={classes.fifthInner}
                              topClass={themeMode === 0 ? classes.fifthDiv: classes.fifthDivLight} onConnect={(index: number, state: any) => onConnect(index, state)}
                               onClick={onClick} onClaim={(index:any ) =>onClaim(index)}/>
                        </div>
                    </div>
                </div>

               
                <div className={`${classes.boardDiv} row div_group d-block`}>
                    <div className='title_div text-center'>
                        <p className=' mb-56'>
                            Staking Leaderboard
                        </p>
                    </div>
                    <Table classes={classes} data={userData}/>
                </div>
            </div>
            <Footer className={`${classes.footer}`}/>
        </div>
    )


}
export default DashboardPage;