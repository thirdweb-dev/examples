import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import UseModule from "../useModule";
import './ApproveComponent.css';

//use the wallet instead of private keys
const ApproveComponent = () => {
    const { address } = useWeb3();
    let [isAdmin, setAdmin] = useState(false);
    let [inputValue, setInputValue] = useState('');
    let [approvalList, setApprovalList] = useState([]);

    const tokenModule = UseModule();


    const getRoles = async () => {
        if (tokenModule) {
            await tokenModule.getRoleMembers("admin")
                .then((data: any) => {
                    data.forEach((element: string) => {
                        if (element == address) {
                            setAdmin(true);
                        }
                    });
                })
                .catch((error: any) => console.error(error));
        }
    };

    getRoles();

    const writeLS = (wallet: string) => {
        let applist = localStorage.getItem('approvalList') ? JSON.parse(localStorage.getItem('approvalList')!) : [];

        if (applist.indexOf(wallet) === -1) {
            applist.push(wallet)
            setApprovalList(applist);
            localStorage.setItem('approvalList', JSON.stringify(applist));
        } else {
            alert('you already registered, please wait for the owner')
        }
    }

    const readLS = () => {
        let list = localStorage.getItem('approvalList') ? JSON.parse(localStorage.getItem('approvalList')!) : [];
        if (list) {
            approvalList = list
        }
    }

    const setAllowance = async (wallet: string) => {  
        await tokenModule!.setAllowance(wallet, ethers.utils.parseEther("1000"))
          .then((data) => {console.log(data)})
          .catch((error) => console.error(error));
      };

    return (
        <>
            {isAdmin ?
                <div className="input-appr-container">
                    {readLS()}
                    <ul>
                        {approvalList.map(item => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <button type="button" onClick={() => localStorage.clear()}>clear list</button>

                    <input style={{ padding: "12px 20px", margin: "8px 0", boxSizing: "border-box" }}
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button type="button" onClick={() => setAllowance(inputValue)}>set Allowance</button>
                </div>
                :
                <button type="button" onClick={() => writeLS(address!)}>Register</button>
            }
        </>
    );
};
export default ApproveComponent;