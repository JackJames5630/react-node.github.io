/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './index.css';
import { useSelector} from 'react-redux';
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => createStyles({
    first: {
        background: `rgba(252, 220, 105, 0.7)`
    },
    second: {
        background: `rgba(255, 255, 255, 0.7)` 
    },
    third: {
        background: `rgba(219, 166, 86, 0.7)`
    },
    secondLight: {
        background: `rgba(0, 0, 0, 0.25)`
    }

}))

const Table = (props: any) => {
    const themeMode = useSelector((state: any) => state.themeReducer.themeMode);
    const customClasses = useStyles();
    const trClasses = [customClasses.first, (themeMode === 0 ? customClasses.second: customClasses.secondLight), customClasses.third];
    const {classes, data} = props;
    return (
        <div >
            <table className={`table text-center ${classes.fontColor} space_table`}>
            <thead>
                <tr className={`${classes.innerDivText} normal_font`}>
                    <th scope="col">#</th>
                    <th scope="col" className='username'>User name</th>
                    <th scope="col">Staking Duration</th>
                    <th scope="col">Earn Reward</th>
                </tr>
            </thead>
            <tbody>{
                data.length > 0 && data.map((row: any, index:any) => {
                    return(
                        <tr key={index} className={index < 3 ? `${classes.coloredCell}`:( index % 2 === 0 ? classes.tableCell: '')}>
                            <th scope="row" className={index < 3 ? 'frame_head': ''}>
                                <div className={ index < 3 ? 'frame_div': ''}>{index}</div>
                                {index < 3 && <img className='frame_image' src={ themeMode === 0 ? `darkFrame.png`: 'lightFrame.png'}/>}
                                {index < 3 && <div className={`first_part_cell ${trClasses[index]}`}></div>}
                            </th>
                            <td className='username'>{row.user}</td>
                            <td>{row.duration}</td>
                            <td>{row.reward.toFixed(2)}{" "}{"SOLCH"}</td>
                        </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
    )
}
export default Table;