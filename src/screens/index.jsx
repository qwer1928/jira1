import { useState, useEffect } from "react"
import React from 'react'
import * as qs from 'qs'
import SearchPanel from "./project-list/search-panel"
import List from "./project-list/list"
import { cleanObject, useMount,useDebounce } from "utils";
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: "",
        personId:"",
    })
    const debouncedParam=useDebounce(param,2000)
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);       
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async (response) => {
            if (response.ok) {
                setList(await response.json());
            }
        })
    }, [debouncedParam]);
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json())
            }
        });
      
    });
    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    )
}
export default ProjectListScreen