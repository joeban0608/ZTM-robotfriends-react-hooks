import React, { useState, useEffect } from 'react';
import CardList from '../component/CardList';
import SearchBox from '../component/SearchBox';
import Scroll from '../component/Scroll';
import ErrorBoundary from '../component/ErrorBoundary'
import './App.css';
import userEvent from '@testing-library/user-event';

function App () {
    const [robotsInfo, setRobotsInfo] = useState([])
    const [searchField, setSearchField] = useState('')
    const [count,setCount] = useState(0)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => response.json())
          .then(users => {setRobotsInfo(users)})
        console.log(count)
    }, [count]) // 當count改變的時候，useEffect才會執行

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    const filteredRobots = robotsInfo.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return !robotsInfo.length ?
    <h1 className="tc f1"><span>Loading...</span></h1> :
    (
        <div className="tc">
            <h1 className="f1"><span>RobotFriends</span></h1>
            <button onClick={()=> setCount(count + 1)}>Click me</button>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundary>
                    <CardList robotsInfo={ filteredRobots }/>
                </ErrorBoundary>
            </Scroll>
        </div>
    );
}

export default App;