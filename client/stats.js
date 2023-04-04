let nameInput = document.getElementById('page3-input')
let season = document.getElementById('page3-season')
let getPlayerBtn = document.getElementById('get-player-btn')
let playerSquare = document.getElementById('player-square')

function getPlayer(){
    let num = season.value
    let name = nameInput.value
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
            if(num === 'Current Season'){
                num = '2022-23'
            }
            console.log(res.data.data[0])
            playerSquare.innerHTML = ''
            let playerElem =`
                <section class="page3-top">
                    <h1 class="page3-name">${name}</h1>
                    <h2 class="season-display">${num}</h2>
                </section>
                <section class="page3-bottom">
                    <aside class="left-stats">
                        <h1 class="stat">AST: ${res.data.data[0].ast}</h1>
                        <h1 class="stat">BLK: ${res.data.data[0].blk}</h1>
                        <h1 class="stat">DREB: ${res.data.data[0].dreb}</h1>
                        <h1 class="stat">3PT%:${res.data.data[0].fg3_pct}</h1>
                        <h1 class="stat">3PA: ${res.data.data[0].fg3a}</h1>
                        <h1 class="stat">3PM: ${res.data.data[0].fg3m}</h1>
                        <h1 class="stat">FG%: ${res.data.data[0].fg_pct}</h1>
                        <h1 class="stat">FGA: ${res.data.data[0].fga}</h1>
                        <h1 class="stat">FGM: ${res.data.data[0].fgm}</h1>
                        <h1 class="stat">FT%: ${res.data.data[0].ft_pct}</h1>
                    </aside>
                    <aside class="right-stats">
                        <h1 class="stat1">FTA: ${res.data.data[0].fta}</h1>
                        <h1 class="stat1">FTM: ${res.data.data[0].ftm}</h1>
                        <h1 class="stat1">Games Played: ${res.data.data[0].games_played}</h1>
                        <h1 class="stat1">Minutes Played: ${res.data.data[0].min}</h1>
                        <h1 class="stat1">OREB: ${res.data.data[0].oreb}</h1>
                        <h1 class="stat1">PF: ${res.data.data[0].pf}</h1>
                        <h1 class="stat1">PTS: ${res.data.data[0].pts}</h1>
                        <h1 class="stat1">REB: ${res.data.data[0].reb}</h1>
                        <h1 class="stat1">STL: ${res.data.data[0].stl}</h1>
                        <h1 class="stat1">TOV: ${res.data.data[0].turnover}</h1>
                    </aside>           
                </section>
            `
            playerSquare.innerHTML = playerElem

        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    nameInput.value = ''
    season.value = 'Current Season'
}


getPlayerBtn.addEventListener('click', getPlayer)
