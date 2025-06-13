// src/pages/EditJob.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true })
      .then((res) => {
        const job = res.data.job;
        setInput({
          title: job.title,
          description: job.description,
          requirements: job.requirements.join(","),
          salary: job.salary,
          location: job.location,
          jobType: job.jobType,
          experience: job.experienceLevel,
          position: job.position,
          companyId: job.company._id,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load job details");
      });
  }, [id]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selected = companies.find(
      (c) => c._id === value || c.name.toLowerCase() === value
    );
    if (selected) setInput({ ...input, companyId: selected._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="max-w-4xl p-8 border-gray-200 rounded-md shadow-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Requirements (comma‑separated)</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Company</Label>
              <Select
                value={companies.find((c) => c._id === input.companyId)?.name}
                onValueChange={selectChangeHandler}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating…
                </>
              ) : (
                "Update Job"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
