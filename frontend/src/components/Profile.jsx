import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";

const skills = ["Html", "CSS", "JavaScript", "Reactjs"];

const Profile = () => {
  const isResume = true;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://imgs.search.brave.com/UZnku52tbIeCtnz5QNy090dGCvvC9RHqGGbA32KdKUU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDk4/MzIzNTA1L3Bob3Rv/L2J1c2luZXNzcGVv/cGxlLXVzaW5nLWRp/Z2l0YWwtdGFibGV0/LXRvZ2V0aGVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz0x/WTVHTm0yM1AyU0NS/TzBMdC00Umd1TUVX/SldtRnYtNkE3SzNm/MlljUHFFPQ"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
                cum earum natus nobis quasi maiores vitae fugiat voluptatibus,
                magnam vero iusto officiis voluptates saepe expedita libero
                repellat, possimus quae minima!
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>patel@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>8976231282</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {skills.length != 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href="https://www.youtube.com/@SupreetSingh946"
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              Patel Mern Stack
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Application Job Table */}
        <AppliedJobTable />
      </div>
    </div>
  );
};

export default Profile;
