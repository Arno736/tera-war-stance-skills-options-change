module.exports = function WarStanceSkillsOptionsChange(mod) {    
    const OFFENSIVE_STANCE = 80400;
    const DEFENSIVE_STANCE = 90200;

    // Group 102 | Lvl67 Skills
    const POLISH_ROB_TANK = 17010401;
    const POLISH_ROB_DPS = 17010402;

    // Group 104 | Lvl69 Skills
    const POLISH_DG_TANK = 17012001;
    const POLISH_DG_DPS = 17012002;

    let currOptions = {}, currClass;

    mod.hook('S_LOGIN', 14, (event) => {
        currClass = event.templateId % 100 - 1; // 0 = Warrior
        currOptions = {};
    });

    mod.hook('C_START_SKILL', 7, (event) => {
        if (currClass != 0) return;

        if (event.skill.id == DEFENSIVE_STANCE) {
            if (!currOptions[POLISH_ROB_TANK]) {
                mod.toServer('C_RQ_SKILL_POLISHING_CHANGE_OPTION', 1, {
                    group: 102,
                    id: POLISH_ROB_TANK,
                    active: true
                });
            }
            if (!currOptions[POLISH_DG_TANK]) {
                mod.toServer('C_RQ_SKILL_POLISHING_CHANGE_OPTION', 1, {
                    group: 104,
                    id: POLISH_DG_TANK,
                    active: true
                });
            }
        }
        if (event.skill.id == OFFENSIVE_STANCE) {
            if (!currOptions[POLISH_ROB_DPS]) {
                mod.toServer('C_RQ_SKILL_POLISHING_CHANGE_OPTION', 1, {
                    group: 102,
                    id: POLISH_ROB_DPS,
                    active: true
                });
            }
            if (!currOptions[POLISH_DG_DPS]) {
                mod.toServer('C_RQ_SKILL_POLISHING_CHANGE_OPTION', 1, {
                    group: 104,
                    id: POLISH_DG_DPS,
                    active: true
                });
            }
        }
    });

    mod.hook('S_RP_SKILL_POLISHING_LIST', 1, (event) => {
        if (currClass != 0) return;
        event.optionEffects.forEach(element => {
            currOptions[element.id] = element.active;
        });
    });
}
