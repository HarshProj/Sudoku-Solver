"use client"
import Image from "next/image";
import { Navbar } from "./Components/Navbar";
import { useEffect, useState } from "react";

import {FireSimple} from "@phosphor-icons/react";
const initial=[
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1]
]
export default function Home() {
  const [indexes,setIndexes]=useState([0,1,2,3,4,5,6,7,8])
  const [sudo,setSudo]=useState(deepcopy(initial))
  function deepcopy(arr){
    return JSON.parse(JSON.stringify(arr));
  }
  const handlechange=(e,row,col)=>{
    const val=parseInt(e.target.value)||-1,grid=deepcopy(sudo);
    if(val<=9&&val>0||val===-1){
      grid[row][col]=val;
    }
    setSudo(grid);
  }
  function check(arr, i, j, val) {
    for (let x = 0; x < 9; x++) {
        if (arr[x][j] === val || arr[i][x] === val || arr[3 * Math.floor(i / 3) + Math.floor(x / 3)][3 * Math.floor(j / 3) + (x % 3)] === val) {
            return false;
        }
    }
    return true;
}
function solve(arr, i, j) {
    if (i === 9) {
        return true;
    }
    if (j === 9) {
        return solve(arr, i + 1, 0);
    }
    if (arr[i][j] !== -1) {
        return solve(arr, i, j + 1);
    }
    for (let k = 1; k <= 9; k++) {
        if (check(arr, i, j, k)) {
            arr[i][j] = k;
            if (solve(arr, i, j + 1)) {
                return true;
            }
            arr[i][j] = -1;
        }
    }
    return false;
}
// useEffect(()=>{
//   localStorage.setItem("sudo",sudo);
// },[sudo])
  const solveit=()=>{
    let grid=deepcopy(sudo);
   let is=solve(grid, 0, 0);
    if (is) {
        setSudo(deepcopy(grid));  // Update the grid if solved
        alert("Sudoku Solved");
    } else {
        alert("Sudoku is unsolvable");
    }
  }
  const resetit=()=>{
    setSudo(initial);
  }
  const checkit=(arr)=>{
    let grid=deepcopy(sudo);
    let is=solve(grid, 0, 0);
    console.log(grid,arr);
    if (is) {
      const arraysAreEqual = (arr1, arr2) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (arr1[i][j] !== arr2[i][j]) {
                    return false; 
                }
            }
        }
        return true;
    };
  
    if (arraysAreEqual(grid, arr)) {
        alert("Hurray! You Solved it");
    } else {
        alert("Oops!! There is some issue with your solution");
    } 
  } else {
      alert("Sudoku is unsolvable");
  }
  
  }
  return (
    <>
     
  <Navbar/>
    <div className="pt-20 pl-10 max-sm:pl-2">
     <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
      <h2 className="text-xl max-sm:text-sm max-sm:w-full">
      <FireSimple size={20} weight="fill"  className="inline" />You can Enter Your Own sudoku to find the solution of it!!<FireSimple size={20} className="inline" weight="fill"/></h2>
      <table>
        <tbody className="border">
          {
            indexes.map((row,ind)=>{
              return( 
                <tr key={ind} className={(row+1)%3===0&row!=8?"border-b-2 border-black":""}>
                  {indexes.map((col,ind2)=>{
                    return(
                      <td key={ind+ind2} className={(col+1)%3===0&&col!=8?"border-r-2 border-black":""}>
                        <input type="text" className="w-[50px] h-[50px] font-medium text-center max-sm:w-[30px] max-sm:h-[30px] border-black border" onChange={(e)=>{handlechange(e,row,col)}} value={sudo[row][col]==-1?"":sudo[row][col]}/>
                      </td>
                    )
                  })}
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className="">
        <button className="cursor-pointer p-4 border rounded-md shadow-md bg-emerald-300" onClick={solveit}>Solve</button>
        <button className="cursor-pointer p-4 border rounded-md shadow-md bg-emerald-300" onClick={resetit}>Reset</button>
        <button className="cursor-pointer p-4 border rounded-md shadow-md bg-emerald-300" onClick={()=>{checkit(sudo)}}>check</button>
      </div>
     </div>
    </div>
      
    </>
  );
}
