 
function maxRunConsededByEachTeam(matches){
    let result = {};
    for (let match of matches) {
        if(match.season == "2017"){
            const team1 = match.team1;
            const team2 = match.team2;
            const winRuns = parseInt(match.win_by_runs);
            const teamLost = match.winner == team1?team2:team1;
            if (!result[teamLost]) {
                result[teamLost] = 0;
            }
            if(winRuns>result[teamLost]){
                result[teamLost] = winRuns
            }
        }
    }
    return result;
}
module.exports = maxRunConsededByEachTeam;