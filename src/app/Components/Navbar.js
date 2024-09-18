"use client"
import {Info} from "@phosphor-icons/react";
import { useState } from "react";
export const Navbar = () => {
    const [click,setClick]=useState(false)
  return (
    <div className="fixed shadow-lg w-full flex justify-center h-16 items-center ">
    <h1 className="text-3xl font-semibold text-center mt-5 w-full ">Suduko Solver</h1>
    <div className="cursor-pointer relative right-0 hov h-[4.25rem] right-5  flex items-center">
  <Info size={30}  />
  <div className="absolute top-[4.25rem] shadow-lg w-[50vh]  h-[500px] right-0 max-md:w-[30vh] bg-white onhov"> <h3 className="text-2xl max-md:text-xl font-bold">Instruction:</h3>
    <div className="">
        <div>
A Sudoku solution must satisfy all the following conditions-

    <p className="pl-2">1. Each of the digits 1 - 9 must occur exactly once in each row. </p>
    <p className="pl-2">
2. Each of the digits 1 - 9 must occur exactly once in each column.</p>
    <p className="pl-2">
3. Each of the digits 1 - 9 must occur exactly once in each of the 9, 3 x 3 sub-matrices of the matrix.
    </p>
        </div>
    </div>
  </div>
    </div>

  </div>
  )
}
