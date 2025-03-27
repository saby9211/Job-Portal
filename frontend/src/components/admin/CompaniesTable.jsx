import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";


const CompaniesTable = () => {
  
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
            
              <TableCell>
                <Avatar>
                  <AvatarImage src="https://imgs.search.brave.com/UZnku52tbIeCtnz5QNy090dGCvvC9RHqGGbA32KdKUU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDk4/MzIzNTA1L3Bob3Rv/L2J1c2luZXNzcGVv/cGxlLXVzaW5nLWRp/Z2l0YWwtdGFibGV0/LXRvZ2V0aGVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz0x/WTVHTm0yM1AyU0NS/TzBMdC00Umd1TUVX/SldtRnYtNkE3SzNm/MlljUHFFPQ" />
                </Avatar>
              </TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>18-08-2025</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div>
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            
        
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
