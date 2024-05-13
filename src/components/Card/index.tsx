import React, { useEffect, useState } from 'react'
import { getCurrentChainTime } from '../../utils/Helper';
import { useConnection, useAnchorWallet, useWallet, AnchorWallet } from "@solana/wallet-adapter-react";
import Modal from '../Modal';
import './index.css';
import CONFIG from './../../config';
const { APY, DAY_TIME, POOLTYPES } = CONFIG;
type LIMIT = {
    day: number,
    hour: number,
    minute: number,
    second: number
};
const Card = (props: any) => {
    const { connection } = useConnection();
    const { cardState, label, index, data, onConnect, onClaim } = props;
    const [canClaim, setCanClaim] = useState(false);
    const secondButtonText = ['Connect Wallet', 'Stake Now', 'Unstake'];
    const [limitTime, setLimitTime] = useState<LIMIT>();
    const [exist, setExist] = useState(false);
    const [reward, setReward] = useState(0);
    useEffect(() => {
        (async() => {
            const current = await getCurrentChainTime(connection);
            if (data !== undefined && data[index] !==undefined && cardState !==0) {
                let rewardAmount = Math.floor(data[index].reward * 100)/100;
                setReward(rewardAmount)
                if ( data[index].total > 0) {
                    let canClaim = current! < data[index].endTime;
                    setCanClaim(canClaim);
                    if ( data[index].endTime > data[index].startTime &&  data[index].endTime > data[index].curTime) {
                        const result = await getUnlockTime(data[index].curTime, data[index].endTime);
                        let limit: LIMIT = {
                            day: result.day,
                            hour: result.time,
                            minute: result.minute,
                            second: result.second
                        }
                        setLimitTime(limit);
                        setExist(true);
                    }
                    else {
                        setExist(false);
                    }
                } else {
                    setCanClaim(false);
                    setExist(false);
                }
            }
        })()
    }, [data, cardState])
    
    if ( data!== undefined) {
         
    }
    const handleClick = () => {
        onConnect(index, cardState);
    }
    const handleClaim = async () => {
        if ( data[index] ===undefined || cardState ===0 ) return;
        const current = await getCurrentChainTime(connection);
        if ( data[index].endTime < current!) {
            setCanClaim(false);
            return;
        }
        onClaim(index);
    }
    
    const getUnlockTime = async (startTime: any, endTime: any) => {
        let total_seconds = endTime - startTime;
        let day = Math.floor ( total_seconds / DAY_TIME );
        let time = Math.floor ((total_seconds - DAY_TIME * day) / 3600);
        let minute = Math.floor((total_seconds - DAY_TIME * day - 3600 * time) / 60);
        let second = total_seconds - day * DAY_TIME - time * 3600 - minute * 60;
        return {
            day, time, minute, second
        }
    }

    return(
        <div className={`${props.className} card`}>
            <div className={props.topClass ? `${props.topClass}`: 'top_div'}>

            </div>
            <div className='title_div text-center'>
                <p>
                    {label}
                </p>
            </div>
            <div className='content_first_div d-flex justify-content-around'>
                <div className='card_amount_div staked_amount'>
                    <p>
                        Total Token Staked:
                    </p>
                    <p className={`amount ${props.valueClass ? props.valueClass: ''}`}>
                        {"$"}{" "}{data === undefined ? 0: (data[index] === undefined ? 0 :(data[index].total ===0 ? 0: data[index].total.toFixed(2)))}
                    </p>
                </div>
                <div className='card_amount1_div staked_amount'>
                    <p>
                        Deposit Fee
                    </p>
                    <p className={`amount ${props.valueClass ? props.valueClass: ''}`}>
                        {" "}{POOLTYPES[index].fee}{"%"}
                    </p>
                </div>
            </div>
            <div className='content_first_div d-flex justify-content-around'>
                <div className='card_amount_div staked_amount'>
                    <p>
                        Min Staking Amount
                    </p>
                    <p  className={`amount ${props.valueClass ? props.valueClass: ''}`}>
                    {""}{" "}{POOLTYPES[index].minAmount}
                    </p>
                </div>
                <div className='card_amount1_div staked_amount'>
                    <p>
                        APY
                    </p>
                    <p className={`amount ${props.valueClass ? props.valueClass: ''}`}>
                    {""}{" "}{APY[index]}{"%"}{}
                    </p>
                </div>
            </div>
            <div className='content_first_div d-flex justify-content-around'>
                <div className=' card_amount_div staked_amount'>
                    <p>
                        Lock Duration
                    </p>
                    <p  className={`amount ${props.valueClass ? props.valueClass: ''}`}>
                        {POOLTYPES[index].days}{" "}{"Day"}
                    </p>
                </div>
                <div className=' card_amount1_div staked_amount'>
                    <p>
                        SOLCH Earned
                    </p>
                    <p  className={`amount ${props.valueClass ? props.valueClass: ''}`}>
                    {data === undefined ? 0: (data[index] === undefined ? 0 : reward)}
                    </p>
                </div>
            </div>
            <div className={`button_div d-flex justify-content-center ${props.innerClass} ${canClaim ? (index !==4 ? 'abled_button': 'abled_button_last'): 'disabled_button'} `} onClick={handleClaim}>
                    Claim Rewards
            </div>
            <div className={`button_div abled_button  text-center d-flex justify-content-around ${!canClaim ? ' colored_div': 'disabled_button grey_version'} `} onClick={handleClick}>
                <span className='button_label'>
                    {secondButtonText[cardState]}
                </span>
            </div>
            <div className='m-auto'>
                {exist && <p className='m-auto'>
                    {'Unlock at'}{": "}{limitTime?.day}{":"}{limitTime?.hour}{":"}{limitTime?.minute}{":"}{limitTime?.second}
                </p>}
            </div>
        </div>
    )
}
export default Card;