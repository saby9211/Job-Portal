import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'

const Job = () => {
    
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://imgs.search.brave.com/UZnku52tbIeCtnz5QNy090dGCvvC9RHqGGbA32KdKUU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDk4/MzIzNTA1L3Bob3Rv/L2J1c2luZXNzcGVv/cGxlLXVzaW5nLWRp/Z2l0YWwtdGFibGV0/LXRvZ2V0aGVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz0x/WTVHTm0yM1AyU0NS/TzBMdC00Umd1TUVX/SldtRnYtNkE3SzNm/MlljUHFFPQ" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quam iure repudiandae laboriosam, ipsam nihil. Ducimus vitae debitis error ullam veniam esse, corrupti vel enim, ut ex minima labore. Illo?</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">part time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24 LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
            
        </div>
    )
}

export default Job