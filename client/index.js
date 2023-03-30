let nameInput = document.getElementById('name')
let addPlTeam1 = document.getElementById('team1')
let addPlTeam2 = document.getElementById('team2')

let season = document.getElementById('season')

let seeTeam1Btn = document.getElementById('see-team1')
let seeTeam2Btn = document.getElementById('see-team2')

let simulateBtn = document.getElementById('simulate')

let saveTeam1Btn = document.getElementById('save-team1')
let saveTeam2Btn = document.getElementById('save-team2')
let teamNameInput = document.getElementById('team-name-input')

let deleteTeamInput = document.getElementById('delete-team-input')
let deleteTeamBtn = document.getElementById('delete-button')

let useSavedInput = document.getElementById('use-saved-input')
let useSavedBtn1 = document.getElementById('use-saved-button1')
let useSavedBtn2 = document.getElementById('use-saved-button2')

let newGameBtn = document.getElementById('new-game')


let team1 = []
let team2 = []
let team1Names = []
let team2Names = []

function addToTeam1(){
    let nameArr = nameInput.value.split(' ')
    let nameUnderscore = nameArr[0] + '_' + nameArr[1]

    let seasonValue = season.value[0] + season.value[1] + season.value[2] + season.value[3]

    axios.get(`https://www.balldontlie.io/api/v1/players?search=${nameUnderscore}`).then((res) => {
        let playerId = '' + res.data.data[0].id
        let seasonAveragesURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`
        
        if(season.value !== 'Current Season'){
            seasonAveragesURL = `https://www.balldontlie.io/api/v1/season_averages?` + `season=${seasonValue}&` + `player_ids[]=${playerId}`
        }
        
        axios.get(seasonAveragesURL).then((res) => {
            team1.push(res.data.data[0])
        })
    })
    team1Names.push([nameInput.value, seasonValue])
    nameInput.value = ''
}

function addToTeam2(){
    let nameArr = nameInput.value.split(' ')
    let nameUnderscore = nameArr[0] + '_' + nameArr[1]

    let seasonValue = season.value[0] + season.value[1] + season.value[2] + season.value[3]

    axios.get(`https://www.balldontlie.io/api/v1/players?search=${nameUnderscore}`).then((res) => {
        let playerId = '' + res.data.data[0].id
        let seasonAveragesURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`
        if(season.value !== 'Current Season'){
            seasonAveragesURL = `https://www.balldontlie.io/api/v1/season_averages?` + `season=${seasonValue}&` + `player_ids[]=${playerId}`
        }
        axios.get(seasonAveragesURL).then((res) => {
            team2.push(res.data.data[0])
        })
    })
    team2Names.push([nameInput.value, seasonValue])
    nameInput.value = ''
}

function simulateGame(){
    team1Averages = []
    team2Averages = []

    // Team 1 stats
    let team1Ast = team1.reduce((a, c) => {
        return a + c.ast
    }, 0)
    team1Averages.push(team1Ast)

    let team1Blk = team1.reduce((a, c) => {
        return a + c.blk
    }, 0)
    team1Averages.push(team1Blk)

    let team1Fg3_pct = team1.reduce((a, c) => {
        return a + c.fg3_pct
    }, 0)
    team1Averages.push(team1Fg3_pct)

    let team1Fg3m = team1.reduce((a, c) => {
        return a + c.fg3m
    }, 0)
    team1Averages.push(team1Fg3m)

    let team1Fg_pct = team1.reduce((a, c) => {
        return a + c.fg_pct
    }, 0)
    team1Averages.push(team1Fg_pct)

    let team1Fgm = team1.reduce((a, c) => {
        return a + c.fgm
    }, 0)
    team1Averages.push(team1Fgm)

    let team1Ft_pct = team1.reduce((a, c) => {
        return a + c.ft_pct
    }, 0)
    team1Averages.push(team1Ft_pct)

    let team1Ftm = team1.reduce((a, c) => {
        return a + c.ftm
    }, 0)
    team1Averages.push(team1Ftm)

    let team1Pf = team1.reduce((a, c) => {
        return a + c.pf
    }, 0)
    team1Averages.push(team1Pf)

    let team1Pts = team1.reduce((a, c) => {
        return a + c.pts
    }, 0)
    team1Averages.push(team1Pts)

    let team1Reb = team1.reduce((a, c) => {
        return a + c.reb
    }, 0)
    team1Averages.push(team1Reb)

    let team1Stl = team1.reduce((a, c) => {
        return a + c.stl
    }, 0)
    team1Averages.push(team1Stl)

    let team1Turnover = team1.reduce((a, c) => {
        return a + c.turnover
    }, 0)
    team1Averages.push(team1Turnover)

    let team1Av = team1Averages.map((e) => {
        return e / team1.length
    })



    // Team 2 stats
    let team2Ast = team2.reduce((a, c) => {
        return a + c.ast
    }, 0)
    team2Averages.push(team2Ast)

    let team2Blk = team2.reduce((a, c) => {
        return a + c.blk
    }, 0)
    team2Averages.push(team2Blk)

    let team2Fg3_pct = team2.reduce((a, c) => {
        return a + c.fg3_pct
    }, 0)
    team2Averages.push(team2Fg3_pct)

    let team2Fg3m = team2.reduce((a, c) => {
        return a + c.fg3m
    }, 0)
    team2Averages.push(team2Fg3m)

    let team2Fg_pct = team2.reduce((a, c) => {
        return a + c.fg_pct
    }, 0)
    team2Averages.push(team2Fg_pct)

    let team2Fgm = team2.reduce((a, c) => {
        return a + c.fgm
    }, 0)
    team2Averages.push(team2Fgm)

    let team2Ft_pct = team2.reduce((a, c) => {
        return a + c.ft_pct
    }, 0)
    team2Averages.push(team2Ft_pct)

    let team2Ftm = team2.reduce((a, c) => {
        return a + c.ftm
    }, 0)
    team2Averages.push(team2Ftm)

    let team2Pf = team2.reduce((a, c) => {
        return a + c.pf
    }, 0)
    team2Averages.push(team2Pf)

    let team2Pts = team2.reduce((a, c) => {
        return a + c.pts
    }, 0)
    team2Averages.push(team2Pts)

    let team2Reb = team2.reduce((a, c) => {
        return a + c.reb
    }, 0)
    team2Averages.push(team2Reb)

    let team2Stl = team2.reduce((a, c) => {
        return a + c.stl
    }, 0)
    team2Averages.push(team2Stl)

    let team2Turnover = team2.reduce((a, c) => {
        return a + c.turnover
    }, 0)
    team2Averages.push(team2Turnover)

    let team2Av = team2Averages.map((e) => {
        return e / team2.length
    })

    let team1Score = 0
    let team2Score = 0

    for(let i = 0; i <= 12; i++){
        if(team1Av[i] === team1Av[3]){
            if(team1Av[i] > team2Av[i]){
                team1Score += 2
            }else{
                team2Score += 2
            }
        }else if(team1Av[i] === team1Av[8]){
            if(team1Av[i] > team2Av[i]){
                team1Score--
            }else{
                team2Score--
            }
        }else if(team1Av[i] === team1Av[12]){
            if(team1Av[i] > team2Av[i]){
                team1Score--
            }else{
                team2Score--
            }
        }else{
            if(team1Av[i] > team2Av[i]){
                team1Score++
            }else{
                team2Score++
            }

        }
    }

    // console.log(team1Score)
    // console.log(team2Score)

    if(team1Score === team2Score){
        if(team1Av[9] > team2Av[9]){
            console.log('Team 1 wins')
        }else{
            console.log('Team 2 wins')
        }
    }else{
        if(team1Score > team2Score){
            console.log('Team 1 wins')
        }else{
            console.log('Team 2 wins')
        }
    }

    // console.log(team1Av)
    // console.log(team2Av)
}

function saveTeam1(){
    let body = {
        teamName: teamNameInput.value,
        player1: team1Names[0],
        player2: team1Names[1],
        player3: team1Names[2],
        player4: team1Names[3],
        player5: team1Names[4]
    }
    axios.post('http://localhost:5020/save-team-1', body).catch(err => console.log(err))
    teamNameInput.value = ''
}

function saveTeam2(){
    let body = {
        teamName: teamNameInput.value,
        player1: team2Names[0],
        player2: team2Names[1],
        player3: team2Names[2],
        player4: team2Names[3],
        player5: team2Names[4]
    }
    axios.post('http://localhost:5020/save-team-2', body).catch(err => console.log(err))
    teamNameInput.value = ''
}

function useSavedTeamFor1(){
    let teamName = useSavedInput.value
    axios.get(`http://localhost:5020/use-saved1/${teamName}`).then((res) => {
        for(let i = 1; i < 6; i++){
            if(res.data[0][`player_${i}`] !== 'undefined'){
                let splitData = (res.data[0][`player_${i}`]).split(',')
                let nameUnderscore = splitData[0]
                let season = splitData[1]




                axios.get(`https://www.balldontlie.io/api/v1/players?search=${nameUnderscore}`).then((res) => {
                    let playerId = '' + res.data.data[0].id
                    let seasonAveragesURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`
        
                    if(season !== 'Curr'){
                        seasonAveragesURL = `https://www.balldontlie.io/api/v1/season_averages?` + `season=${season}&` + `player_ids[]=${playerId}`
                    }
        
                    axios.get(seasonAveragesURL).then((res) => {
                        team1.push(res.data.data[0])
                    })

                })





            }
        }
        
    }).catch(err => console.log(err))
    useSavedInput.value = ''
}

function useSavedTeamFor2(){
    let teamName = useSavedInput.value
    axios.get(`http://localhost:5020/use-saved2/${teamName}`).then((res) => {
        for(let i = 1; i < 6; i++){
            if(res.data[0][`player_${i}`] !== 'undefined'){
                let splitData = (res.data[0][`player_${i}`]).split(',')
                let nameUnderscore = splitData[0]
                let season = splitData[1]




                axios.get(`https://www.balldontlie.io/api/v1/players?search=${nameUnderscore}`).then((res) => {
                    let playerId = '' + res.data.data[0].id
                    let seasonAveragesURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`
        
                    if(season !== 'Curr'){
                        seasonAveragesURL = `https://www.balldontlie.io/api/v1/season_averages?` + `season=${season}&` + `player_ids[]=${playerId}`
                    }
        
                    axios.get(seasonAveragesURL).then((res) => {
                        team2.push(res.data.data[0])
                    })

                })





            }
        }
        
    }).catch(err => console.log(err))
    useSavedInput.value = ''
}

function deleteTeam(){
    let teamName = deleteTeamInput.value
    axios.delete(`http://localhost:5020/delete/${teamName}`).catch(err => console.log(err))
    deleteTeamInput.value = ''
}

function newGame(){
    team1 = []
    team2 = []
    team1names = []
    team2names = []
}


addPlTeam1.addEventListener('click', addToTeam1)
addPlTeam2.addEventListener('click', addToTeam2)
simulateBtn.addEventListener('click', simulateGame)
saveTeam1Btn.addEventListener('click', saveTeam1)
saveTeam2Btn.addEventListener('click', saveTeam2)
useSavedBtn1.addEventListener('click', useSavedTeamFor1)
useSavedBtn2.addEventListener('click', useSavedTeamFor2)
deleteTeamBtn.addEventListener('click', deleteTeam)
newGameBtn.addEventListener('click', newGame)



seeTeam1Btn.addEventListener('click', () => console.log(team1))
seeTeam2Btn.addEventListener('click', () => console.log(team2))