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
                if(res.data[i][`player_${k}`] !== 'undefined' && res.data[i][`player_${k}`] !== ''){
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

            function deleteTeam(){
                let teamName = page2TeamName.textContent
                axios.delete(`http://localhost:5020/delete/${teamName}`).catch(err => console.log(err))
                square.innerHTML = ''
                setTimeout(getSaved, 200)
            }

            function editTeam(){
                let num = middle.children.length
                let name0 = ''
                let name1 = ''
                let name2 = ''
                let name3 = ''
                let name4 = ''
                if(middle.children[0]){
                    name0 = middle.children[0].textContent
                }
                if(middle.children[1]){
                    name1 = middle.children[1].textContent
                }
                if(middle.children[2]){
                    name2 = middle.children[2].textContent
                }
                if(middle.children[3]){
                    name3 = middle.children[3].textContent
                }
                if(middle.children[4]){
                    name4 = middle.children[4].textContent
                }
                let names = [name0, name1, name2, name3, name4]
                middle.innerHTML = ''
                for(let i = 0; i < num; i++){
                    let newInput = `<input class="edit-player" value="${names[i]}">`
                    middle.innerHTML += newInput
                }

                bottom.innerHTML = ''
                let saveButton = document.createElement('button')
                saveButton.textContent = 'Save'
                saveButton.classList.add('save-btn')
                bottom.appendChild(saveButton)

                function updateTeam(){
                    let body = {
                        teamName: page2TeamName.textContent,
                        name0: '',
                        name1: '',
                        name2: '',
                        name3: '',
                        name4: '',
                    }

                    if(middle.children[0]){
                        body.name0 = middle.children[0].value
                        let nameArr0 = body.name0.split(' ')
                        body.name0 = nameArr0[0] + ' ' + nameArr0[1] + ',' + nameArr0[2][0] + nameArr0[2][1] + nameArr0[2][2] + nameArr0[2][3]
                    }
                    if(middle.children[1]){
                        body.name1 = middle.children[1].value
                        let nameArr1 = body.name1.split(' ')
                        body.name1 = nameArr1[0] + ' ' + nameArr1[1] + ',' + nameArr1[2][0] + nameArr1[2][1] + nameArr1[2][2] + nameArr1[2][3]
                    }
                    if(middle.children[2]){
                        body.name2 = middle.children[2].value
                        let nameArr2 = body.name2.split(' ')
                        body.name2 = nameArr2[0] + ' ' + nameArr2[1] + ',' + nameArr2[2][0] + nameArr2[2][1] + nameArr2[2][2] + nameArr2[2][3]
                    }
                    if(middle.children[3]){
                        body.name3 = middle.children[3].value
                        let nameArr3 = body.name3.split(' ')
                        body.name3 = nameArr3[0] + ' ' + nameArr3[1] + ',' + nameArr3[2][0] + nameArr3[2][1] + nameArr3[2][2] + nameArr3[2][3]
                    }
                    if(middle.children[4]){
                        body.name4 = middle.children[4].value
                        let nameArr4 = body.name4.split(' ')
                        body.name4 = nameArr4[0] + ' ' + nameArr4[1] + ',' + nameArr4[2][0] + nameArr4[2][1] + nameArr4[2][2] + nameArr4[2][3]
                    }

                    axios.put('http://localhost:5020/update-team', body).then(() => {
                        square.innerHTML = ''
                        getSaved()
                    })
                }

                saveButton.addEventListener('click', updateTeam)
            }

            deleteButton.addEventListener('click', deleteTeam)
            editButton.addEventListener('click', editTeam)
            
        }
    })
}

getSaved()