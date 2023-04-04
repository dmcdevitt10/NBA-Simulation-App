let square = document.getElementById('square')


function getSaved(){
    axios.get('http://localhost:5020/get-saved').then((res) => {
        for(let i = 0; i < res.data.length; i++){
            let page2Team = document.createElement('section')
            page2Team.classList.add('page-2-team')
            square.appendChild(page2Team)

            let top = document.createElement('section')
            top.classList.add('top')
            page2Team.appendChild(top)

            let page2TeamName = document.createElement('h1')
            page2TeamName.classList.add('page-2-team-name')
            page2TeamName.textContent = res.data[i]['team_name']
            top.appendChild(page2TeamName)

            let middle = document.createElement('section')
            middle.classList.add('middle')
            page2Team.appendChild(middle)

            for(let k = 1; k < 6; k++){
                if(res.data[i][`player_${k}`] !== 'undefined'){
                    let h3 = document.createElement('h3')
                    h3.classList.add('page-2-player')
                    let playerName = res.data[i][`player_${k}`]
                    playerName = playerName.replace(',', ' ')
                    let num = +(playerName[playerName.length - 2] + playerName[playerName.length - 1])
                    let realNum = '' + (num + 1)
                    if(realNum.length === 1){
                        realNum = '0' + realNum
                    }
                    h3.textContent = playerName + '-' + realNum
                    middle.appendChild(h3)
                }
            }

            let bottom = document.createElement('section')
            bottom.classList.add('bottom')
            page2Team.appendChild(bottom)

            let editButton = document.createElement('button')
            editButton.classList.add('edit')
            editButton.textContent = 'Edit'
            bottom.appendChild(editButton)

            let deleteButton = document.createElement('button')
            deleteButton.classList.add('delete')
            deleteButton.textContent = 'Delete'
            bottom.appendChild(deleteButton)
            
        }
    })
}

getSaved()