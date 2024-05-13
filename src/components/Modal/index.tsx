import React, { useEffect, useState } from 'react'
import './index.css'
import { useToasts } from 'react-toast-notifications';
import styled, {css} from 'styled-components';
import { useSelector } from 'react-redux';
import CONFIG from './../../config';
const { DECIMAL, POOLTYPES }  = CONFIG;

const InputAmount = styled.input`
${(props:{mode: any}) => {
    switch (props.mode) {
        case 0: 
            return css`
                color: white;`
        case 1: 
            return css`
                color: black;
            `
    }
}}
`
const Modal = (props: any) => {
    const { addToast } = useToasts();
    const {classes, open, index, total, limit} = props;
    const [totalAmount, setTotalAmount] = useState(0);
    const themeMode = useSelector((state: any) => state.themeReducer.themeMode);
    useEffect(() => {
        if (total[index]) {
            setTotalAmount(Number.parseFloat(total[index].availableAmount.toString()) / DECIMAL);
        }
    }, [total])
    
    const [amount, setAmount] = useState<number>();
    const lockDurations = [7, 30, 90, 180, 365];
    
    const handleChange = (e: any) => {
        e.preventDefault();
        let value = e.target.value;
        if (isNaN(value) || value < 0) {
          addToast('Input a valid Number!', {
            appearance: 'warning',
            autoDismiss: true
          })
          return ;
        }
        setAmount(value);
    }
    const onConfirm = () => {
        let expectedAmount = POOLTYPES[index].minAmount;
        if ( amount === undefined || amount === null) return;
        let amountToGet = (amount! * ( 1 - POOLTYPES[index].fee / 100 ) ) * POOLTYPES[index].apy / 100;
        if ( amount < expectedAmount) {
            addToast('Input valid amount!', {
                appearance: 'warning',
                autoDismiss: true
            })
            return ;
        }
        if ( amountToGet > totalAmount) {
            addToast('Not enough reward. Select another Pool!', {
                appearance: 'warning',
                autoDismiss: true
            })
            return ;
        }

        let amountToStake = amount //send total including fees
        props.onConfirm(amountToStake);
        setAmount(undefined);
    }
    const onCancel = () => {
        props.onCancel();
        setAmount(undefined);
    }
    return (
   <div className=''>
     { open && <div className='parent_div'><div className='background_div' onClick={props.onCancel}></div>
     <div className={` modal_div`}>
        <div className={`content_div d-block ${classes.contentDiv}`}>
            <div className={` label_div text-center d-flex justify-content-center`}>
                <span>
                    Stake
                </span>

            </div>
            <div className={`amount_div ${classes.amountDiv}`}>
                <div className='text-center input_div'>
                    <span className='text_label'>
                        Enter Amount
                    </span>
                </div>
                <div className={`d-flex ${classes.inputDiv}`}>
                    <div className='input_amount_div'>
                        <InputAmount mode={themeMode} type={'number'} value={amount} onChange={(e) => handleChange(e)} />
                                
                    </div>
                    <div className='input_unit_div'>
                        <span>
                            SOLCH    
                        </span>  
                    </div>
                </div>

            </div>

            <div className={`description_div`}>
                <span>
                    Moon Cash Lock Duration:{" "}{lockDurations[index]}
                </span>
            </div>
            <div className='button_div d-flex row div_group  justify-content-evenly'>
                <div className={'modal_button colored_div text-center'} onClick={onConfirm}>
                    <span className='day_label'>
                        Confirm
                    </span>
                </div>
                <div className={`modal_button ${classes.modalButton} text-center`} onClick={onCancel}>
                    <span className='day_label'>
                        Cancel
                    </span>
                </div>
            </div>
            
        </div>
      </div>
      </div>
      }
      </div>
    );
  }
export default Modal;

