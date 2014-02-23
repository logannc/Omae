function Metatype(race) {
    this.Metatype = race;
    this.SpecPoints = 0;
    this.PointsLeft = 0;
    this.RacialProperties = [];
}

Metatype.prototype.spendPoints = function (points) {
    if (points <= this.PointsLeft) {
        this.PointsLeft -= points;
    } else {
        // throw error
    }
}

Metatype.prototype.refundPoints = function (points) {
    if (points + this.PointsLeft > this.Specpoints){
        this.PointsLeft = this.SpecPoints;
    } else {
        this.PointsLeft += points;
    }
}

Metatype.prototype.applyRacials = function (chum) {
    this.RacialProperties.forEach(function (property) {
        property.call(chum, true);
    });
}

Metatype.prototype.removeRacials = function (chum) {
    this.RacialProperties.forEach(function (property) {
        property.call(chum, false);
    });
}

Metatype.prototype.removeSelf = function (chum) {
    this.removeRacials(chum)
    chum.Metatype = null
}

function Elf(priority) {
    elf = new Metatype("Elf");
    elf.RacialProperties = [ function (applying) { if (applying) { /* apply low-light vision */ console.log("fake applying low-light") } else { console.log("fake removing low-light") /* remove low-light vision */ } },
                           function (applying) { if (applying) { /* change racial attribute min-maxes */ } else { /* remove racial attribute min-maxes */ } }]
    switch (priority.toLowerCase()) {
            case "a":
                elf.SpecPoints = 8
                elf.PointsLeft = 8
                break;
            case "b":
                elf.SpecPoints = 6
                elf.PointsLeft = 6
                break;
            case "c":
                elf.SpecPoints = 3
                elf.PointsLeft = 3
                break;
            case "d":
                elf.SpecPoints = 0
                elf.PointsLeft = 0
                break;
            default:
                // throw an error
    }
    return elf
}

function Human(priority) {
    human = new Metatype("Human");
    human.RacialProperties = [ function (applying) { if (applying) { /* change racial attribute min-maxes.. just edge to 7? */ } else { /* undo it */ } } ];
    switch (priority.toLowerCase()) {
            case "a":
                human.SpecPoints = 9
                human.PointsLeft = 9
                break;
            case "b":
                human.SpecPoints = 7
                human.PointsLeft = 7
                break;
            case "c":
                human.SpecPoints = 5
                human.PointsLeft = 5
                break;
            case "d":
                human.SpecPoints = 3
                human.PointsLeft = 3
                break;
            case "e":
                human.SpecPoints = 1
                human.PointsLeft = 1
            default:
                // throw an error
    }
    return human
}


function Dwarf(priority) {
    dwarf = new Metatype("Dwarf");
    dwarf.RacialProperties = [ function (applying) { if (applying) { /* change racial attribute min-maxes.. */ } else { /* undo it */ } },
                             function (applying) { if (applying) { /* thermographic vision */ } else { /* undo */ } },
                             function (applying) { if (applying) { /* +2 Pathogen/Toxic Resist */ } else { /* undo */ } },
                             function (applying) { if (applying) { /* 20 % lifestyle increase */ } else { /* undo */ } } ];
    switch (priority.toLowerCase()) {
            case "a":
                dwarf.SpecPoints = 7
                dwarf.PointsLeft = 7
                break;
            case "b":
                dwarf.SpecPoints = 4
                dwarf.PointsLeft = 4
                break;
            case "c":
                dwarf.SpecPoints = 1
                dwarf.PointsLeft = 1
                break;
            default:
                // throw an error
    }
    return dwarf
}


function Ork(priority) {
    ork = new Metatype("Ork");
    ork.RacialProperties = [ function (applying) { if (applying) { /* change racial attribute min-maxes..  */ } else { /* undo it */ } },
                           function (applying) { if (applying) { /* low-light vision */ } else { /* undo */ } } ];
    switch (priority.toLowerCase()) {
            case "a":
                ork.SpecPoints = 7
                ork.PointsLeft = 7
                break;
            case "b":
                ork.SpecPoints = 4
                ork.PointsLeft = 4
                break;
            case "c":
                ork.SpecPoints = 0
                ork.PointsLeft = 0
                break;
            default:
                // throw an error
    }
    return ork
}


function Troll(priority) {
    troll = new Metatype("Troll");
    troll.RacialProperties = [ function (applying) { if (applying) { /* change racial attribute min-maxes.. */ } else { /* undo it */ } },
                             function (applying) { if (applying) { /* thermographic vision */ } else { /* undo */ } },
                             function (applying) { if (applying) { /* +1 reach */ } else { /* undo */ } },
                             function (applying) { if (applying) { /* +1 Dermal Armor */ } else { /* undo */ } },
                             function (applying) { if (applying) { /* 100% lifestyle increase */ } else { /* undo */ } } ];
    switch (priority.toLowerCase()) {
            case "a":
                troll.SpecPoints = 5
                troll.PointsLeft = 5
                break;
            case "b":
                troll.SpecPoints = 0
                troll.PointsLeft = 0
                break;
            default:
                // throw an error
    }
    return troll
}

function Attribute(name) {
    this.name = name;
    this._value = 1;
    this._min = 1;
    this._max = 6;
}

Attribute.prototype = {
    get value() { return this._value },
    set value(val) {
        if (val >= this.min && val <= this.max){
            this._value = val
        }
        return this._value
    },
    set min(val) {
        this._min = val
        if (this.value < val) {
            this.value = val
        }
    },
    set max(val) {
        this._max = val
        if (this.value > val) {
            this.value = val
        }
    },
    get min() { return this._min },
    get max() { return this._max }
}

function Attributes(priority) {
    this.TotalPoints = { "a" : 24, "b" : 20, "c": 16, "d": 14, "e": 12 }[priority]
    this.SpecPoints = 0;
    this._BOD = new Attribute("BOD");
    this._AGI = new Attribute("AGI");
    this._REA = new Attribute("REA");
    this._STR = new Attribute("STR");
    this._WIL = new Attribute("WIL");
    this._LOG = new Attribute("LOG");
    this._INT = new Attribute("INT");
    this._CHA = new Attribute("CHA");
    this._EDGE = new Attribute("EDG");
    this._MAGI = new Attribute("MAG");
    this._RESO = new Attribute("RES");
    this._MAGI.min = 0
    this._MAGI.max = 0;
    this._RESO.min = 0;
    this._RESO.max = 0;
    Object.keys(this).forEach(function (key) {
        if (key.length == 4) {
            this.__defineGetter__(key.slice(1), function() {return this[key].value})
            this.__defineSetter__(key.slice(1), function(val) {
                noneatmax = true;
                Object.keys(this).forEach(function (key) {
                    if (key.length == 4) { 
                        if (this[key].value == this[key].max) {
                            noneatmax = false
                        }
                    }
                }, this)
                if (noneatmax) {
                    old = this[key].value; this[key].value = val; if (this.SpentPoints() > this.TotalPoints) { this[key].value = old }
                }
            })
        } else if (key.length == 5) {
            this.__defineGetter__(key.slice(1), function() {return this[key].value})
            this.__defineSetter__(key.slice(1), function(val) { old = this[key].value; this[key].value = val; if (this.EDGE + this.MAGI > this.SpecPoints) { this[key].value = old } })
        }
    }, this)
    this.SpentPoints = function () {
        sum = 0;
        Object.keys(this).forEach(function (key) {
            if (key.length == 4 && key[0] == "_") { // all len 4 keys are attributes
                sum += this[key].value - this[key].min
            }
        }, this)
        return sum
    }
}

function Skill(name, stat, defaultable) {
    this.name = name
    this.stat = stat
    this.max = 6; // on CharGen completion, all Skills should ahve this changed to 12. Aptitude quality will modify this.
    this.defaultable = defaultable
    this._rating = 0
    this.__defineGetter__("rating", function() { return this._rating })
    this.__defineSetter__("rating", function(val) { if (val <= max) { this._rating = val } })
}

function Skills(priority) {
    this.SkillPoints = { "a" : 46, "b" : 36, "c": 28, "d": 22, "e": 18 }[priority]
    this.GroupPoints = { "a" : 10, "b" : 5, "c": 2, "d": 0, "e": 0 }[priority]
    this.Skills = {}
    Object.keys(activeSkills).forEach(function (key) {
        this.Skills[key] = new Skill(activeSkills[key].name, activeSkills[key].stat, activeSkills[key].defaultable)
    }, this)
}


/* The Big CHUMMER. This is the main object type, right here. */
function Chummer(charname) {
    this.CharName = charname;
    this.Metatype = null;
    this.Attributes = null;
    this.Skills = null;
    this.Nuyen = null;
    this.Karma = null;
    this.Priorities = { "a" : null, "b" : null, "c" : null, "d" : null, "e" : null }
}

Chummer.prototype.setPriority = function(priority, priorityType, data) {
    priority = priority.toLowerCase()
    if (priority.charCodeAt() < 97 || priority.charCodeAt() > 101) {
        // throw an error
    }
    switch (priorityType.toLowerCase()) {
            case "metatype":
                switch (data.toLowerCase()) {
                        case "elf":
                            newmeta = Elf(priority)
                            break;
                        case "human":
                            newmeta = Human(priority)
                            break;
                        case "dwarf":
                            newmeta = Dwarf(priority)
                            break;
                        case "troll":
                            newmeta = Troll(priority)
                            break;
                        case "ork":
                            newmeta = Ork(priority)
                            break;
                        default:
                            // throw an error
                }
                if (this.Priorities[priority]) {
                    this.Priorities[priority].removeSelf(this)
                    this.Priorities[priority] = null;
                }
                for (var i=97; i<102; i++) {
                    if (this.Priorities[String.fromCharCode(i)] instanceof Metatype) {
                        this.Priorities[String.fromCharCode(i)].removeSelf(this)
                    }
                }
                this.Metatype = newmeta
                this.Priorities[priority] = this.Metatype
                this.Metatype.applyRacials(this)
                break;
            case "attributes":
                if (this.Metatype){
                    this.Metatype.removeRacials(this)
                }
                this.Attributes = new Attributes(priority)
                if (this.Metatype) {
                    this.Metatype.applyRacials(this)
                }
                break;
            case "magres":
            
            case "skills":
                this.Skills = new Skills(priority)
                chum = this
                Object.keys(this.Skills.Skills).forEach(function(key){
                    this.Skills.Skills[key].dicepool = function() {
                        if (this.Skills.Skills[key].rating>0) {
                            return this.Skills.Skills[key].rating + this.Attributes[this.Skills.Skills[key].stat]
                        } else if (this.Skills.Skills[key].defaultable) {
                            return Math.max(this.Attributes[this.Skills.Skills[key].stat] -1,0)
                        } else {
                            return 0
                        }
                    }.bind(chum)
                }, this);
                break;
            case "resources":
                switch (priority) {
                        case "a":
                            this.Nuyen = 450000;
                            break;
                        case "b":
                            this.Nuyen = 275000;
                            break;
                        case "c":
                            this.Nuyen = 140000;
                            break;
                        case "d":
                            this.Nuyen = 50000;
                            break;
                        case "e":
                            this.Nuyen = 6000;
                            break
                }
                break;
            default:
                // throw an error
    }
}



var priorityA;
var priorityB;
var priorityC;
var priorityD;
var priorityE;

var metatype;
var attribute=0;
var specAttribute=0;
var magres;//what kind of emergence or awakening a character is
var skills=0;//skill points
var knowledgepoints=0;//knowledge skill points
var skillgroups=0;//skill group points
var skillgroupmax=6;//this is the max rating for a skill group
var spells=0;//number of spells one can learn
var powerPoints=0.0;//adept power points
var forms=0;//number of complex forms
var nuyen=0;//money
var ess=6.0;
var reachmod=0;//reachmod for trolls
var karma=25;

var bod=1;//current attrabute
var agi=1;
var rea=1;
var str=1;
var wil=1;
var log=1;
var int=1;
var cha=1;
var edg=1;
var mag=magic=0;
var res=resonance=0;
var iniphy=int+rea;//physical initiative
var iniphyDice=1;//physical ini dice
var iniast=int*2;//astral initiative
var iniastDice = 2;//astral dice
var inimat = dataP + int;//matrix initiative
var inimatcold = 3;//coldsim dice
var inimathot = 4;//hotsim dice

var dataP=0;//data processing, for TM's

var bodmin=1;//minimum attrabute
var agimin=1;
var reamin=1;
var strmin=1;
var wilmin=1;
var logmin=1;
var intmin=1;
var chamin=1;
var edgmin=1;
var magmin=0;
var resmin=0;

var bodmax=6;//natural maximume attrabute
var agimax=6;
var reamax=6;
var strmax=6;
var wilmax=6;
var logmax=6;
var intmax=6;
var chamax=6;
var edgmax=6;
var magmax=6;
var resmax=6;

var augbod=0;//agumented maximume attrabute
var augagi=0;
var augrea=0;
var augstr=0;
var augwil=0;
var auglog=0;
var augint=0;
var augcha=0;

var phyLimit=0;
var socLimit=0;
var menLimit=0;

var phyLimitMod=0;
var socLimitMod=0;
var menLimitMod=0;

var knowledgeType;//This holds which knowledge type is selected when submitting a new knowledge skill

var focinumber=0;//number of foci that are bonded
var fociRating=0;//the total rating of the foci
var fociMaxRating=mag*2;//max rating or total foci
var activeSkills = {//the list of all the skills in the entire game forever. Catalysis needs to never release any more skills ever after this
    archery:{name:"Archery", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    automatics:{name:"Automatics", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    blades:{name:"Blades", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    clubs:{name:"Clubs", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    exoticrangedweapon:{name:"Exotic Ranged Weapon", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:false},
    heavyweapons:{name:"Heavy Weapons", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    longarms:{name:"Long Arms", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    pistols:{name:"Pistols", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    throwingweapons:{name:"Throwing Weapons", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    unarmedcombat:{name:"Unarmed Combat", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    gunnery:{name:"Gunnery", catalog:"agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    gymnastics:{name:"Gymnastics", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    escapeartist:{name:"Escape Artist", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    exoticmeleeweapon:{name:"Exotic Melee Weapon", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:false},
    locksmith:{name:"Locksmith", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    palming:{name:"Palming", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    sneaking:{name:"Sneaking", catalog: "agility", stat:"AGI", rating:0, mod:0, max:6, defaultable:true},
    diving:{name:"Diving", catalog: "body", stat:"BOD", rating:0, mod:0, max:6, defaultable:true},
    freefall:{name:"Free-Fall", catalog: "body", stat:"BOD", rating:0, mod:0, max:6, defaultable:true},
    pilotaerospace:{name:"Pilot Aerospace", catalog: "reaction", stat:"REA", rating:0, mod:0, max:6, defaultable:false},
    pilotaircraft:{name:"Pilot Aircraft", catalog: "reaction", stat:"REA", rating:0, mod:0, max:6, defaultable:false},
    pilotwalker:{name:"Pilot Walker", catalog: "reaction", stat:"REA", rating:0, mod:0, max:6, defaultable:false},
    pilotexoticvehicle:{name:"Pilot Exotic Vehicle", catalog: "reaction", stat:"REA", rating:0, mod:0, max:6, defaultable:false},
    pilotgroundcraft:{name:"Pilot Ground Craft", catalog: "reaction", stat:"REA", rating:0, mod:0, max:6, defaultable:true},
    pilotwatercraft:{name:"Pilot Water Craft", catalog: "reaction", stat:"REA", rating:0, mod:0, max:6, defaultable:true},
    running:{name:"Running", catalog: "strength", stat:"STR", rating:0, mod:0, max:6, defaultable:true},
    swimming:{name:"Swimming", catalog: "strength", stat:"STR", rating:0, mod:0, max:6, defaultable:true},
    con:{name:"Con", catalog: "charisma", stat:"CHA", rating:0, mod:0, max:6, defaultable:true},
    etiquette:{name:"Etiquette", catalog: "charisma", stat:"CHA", rating:0, mod:0, max:6, defaultable:true},
    instruction:{name:"Instruction", catalog: "charisma", stat:"CHA", rating:0, mod:0, max:6, defaultable:true},
    intimidation:{name:"Intimidation", catalog: "charisma", stat:"CHA", rating:0, mod:0, max:6, defaultable:true},
    leadership:{name:"Leadership", catalog: "charisma", stat:"CHA", rating:0, mod:0, max:6, defaultable:true},
    negotiation:{name:"Negotiation", catalog: "charisma", stat:"CHA", rating:0, mod:0, max:6, defaultable:true},
    performance:{name:"Performance", catalog: "charisma", stat:"CHA", rating:0, mod:0, max:6, defaultable:true},
    impersonation:{name:"Impersonation", catalog: "charisma", stat:"CHA", rating:0, mod:0, max:6, defaultable:true},
    animalhandling:{name:"Animal Handling", catalog: "charisma", stat:"CHA", rating:0, mod:0, max:6, defaultable:true},
    artisan:{name:"Artisan", catalog: "intuition", stat:"INT", rating:0, mod:0, max:6, defaultable:true},
    assensing:{name:"Assensing", catalog: "intuition", stat:"INT", rating:0, mod:0, max:6, defaultable:false},
    disguise:{name:"Disguise", catalog: "intuition", stat:"INT", rating:0, mod:0, max:6, defaultable:true},
    navigation:{name:"Navigation", catalog: "intuition", stat:"INT", rating:0, mod:0, max:6, defaultable:true},
    perception:{name:"Perception", catalog: "intuition", stat:"INT", rating:0, mod:0, max:6, defaultable:true},
    tracking:{name:"Tracking", catalog: "intuition", stat:"INT", rating:0, mod:0, max:6, defaultable:true},
    aeronauticsmechanics:{name:"Aeronautics Mechanics", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    arcane:{name:"Arcane", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    armorer:{name:"Armorer", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:true},
    automotivemechanic:{name:"Automotive Mechanic", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    biotechnology:{name:"Biotechnology", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    chemistry:{name:"Chemistry", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    computer:{name:"Computer", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:true},
    cybertechnology:{name:"Cybertechnology", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    cybercombat:{name:"Cybercombat", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:true},
    demolitions:{name:"Demolitions", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:true},
    electronicwarfare:{name:"Electronic Warfare", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    firstaid:{name:"First Aid", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:true},
    industrialmechanics:{name:"Industrial Mechanics", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    hacking:{name:"Hacking", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:true},
    hardware:{name:"Hardware", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    medicine:{name:"Medicine", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    nauticalmechanics:{name:"Nautical Mechanics", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    software:{name:"Software", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:false},
    forgery:{name:"Forgery", catalog: "logic", stat:"LOG", rating:0, mod:0, max:6, defaultable:true},
    astralcombat:{name:"Astral Combat", catalog: "will", stat:"WIL", rating:0, mod:0, max:6, defaultable:false},
    survival:{name:"Survival", catalog: "will", stat:"WIL", rating:0, mod:0, max:6, defaultable:true},
    alchemy:{name:"Alchemy", catalog: "magic", stat:"MAGI", rating:0, mod:0, max:6, defaultable:true},
    artificing:{name:"Artificing", catalog: "magic", stat:"MAGI", rating:0, mod:0, max:6, defaultable:false},
    banishing:{name:"Banishing", catalog: "magic", stat:"MAGI", rating:0, mod:0, max:6, defaultable:false},
    binding:{name:"Binding", catalog: "magic", stat:"MAGI", rating:0, mod:0, max:6, defaultable:false},
    counterspelling:{name:"Counterspelling", catalog: "magic", stat:"MAGI", rating:0, mod:0, max:6, defaultable:false},
    ritualspellcasting:{name:"Ritual Spellcasting", catalog: "magic", stat:"MAGI", rating:0, mod:0, max:6, defaultable:false},
    spellcasting:{name:"Spellcasting", catalog: "magic", stat:"MAGI", rating:0, mod:0, max:6, defaultable:false},
    summoning:{name:"Summoning", catalog: "magic", stat:"MAGI", rating:0, mod:0, max:6, defaultable:false},
    disenchanting:{name:"Disenchanting", catalog: "magic", stat:"MAGI", rating:0, mod:0, max:6, defaultable:false},
    compiling:{name:"Compiling", catalog: "resonance", stat:"RESO", rating:0, mod:0, max:6, defaultable:false},
    decompiling:{name:"Decompiling", catalog: "resonance", stat:"RESO", rating:0, mod:0, max:6, defaultable:false},
    registering:{name:"Registering", catalog: "resonance", stat:"RESO", rating:0, mod:0, max:6, defaultable:false}

};

var groupSkills = {
    acting: {name:"Acting", rating:0, skillsingroup:{1:"con", 2:"impersonation",3:"performance"}},
    athletics: {name:"Athletics", rating:0, skillsingroup:{1:"gymnastics", 2:"running",3:"swimming"}},
    biotech: {name:"Biotech", rating:0, skillsingroup:{1:"cybertechnology", 2:"firstaid",3:"medicine"}},
    closecombat: {name:"Close Combat", rating:0, skillsingroup:{1:"blades", 2:"clubs",3:"unarmedcombat"}},
    conjuring: {name:"Conjuring", rating:0, skillsingroup:{1:"banishing", 2:"binding", 3:"summoning"},catalog: "magic"},
    cracking: {name:"Cracking", rating:0, skillsingroup:{1:"cybercombat", 2:"electronicwarfare",3:"hacking"}},
    electronics: {name:"Electronics", rating:0, skillsingroup:{1:"computer", 2:"hardware",3:"software"}},
    enchanting: {name:"Enchanting", rating:0, skillsingroup:{1:"alchemy", 2:"artificing",3:"disenchanting"},catalog: "magic"},
    firearms: {name:"Firearms", rating:0, skillsingroup: {1:"automatics", 2:"longarms", 3:"pistols"}},
    influence:{name:"Influence", rating: 0, skillsingroup:{1:"etiquette", 2:"leadership",3:"negotiation"}},
    engineering: {name:"Engineering", rating:0, skillsingroup:{1:"aeronauticsmechanics", 2:"automotivemechanic",3:"industrialmechanics",4:"nauticalmechanics"}},
    outdoors: {name:"Outdoors", rating:0, skillsingroup: {1:"navigation", 2:"survival", 3:"tracking"}},
    sorcery: {name:"Sorcery", rating:0, skillsingroup: {1:"counterspelling", 2:"ritualspellcasting", 3:"spellcasting"}},
    stealth: {name:"Stealth", rating:0, skillsingroup: {1:"disguise", 2:"palming", 3:"sneaking"}},
    tasking: {name:"Tasking", rating:0, skillsingroup: {1:"compiling", 2:"decompiling", 3:"registering"}}
};

var knowledgeSkills = [
]

var adeptPowers = {
    adrenalineboost: {name: "Adrenaline Boost", active: false, level:0, cost:0.25, activation: "free", drain:true },
    astralperception: {name: "Astral Perception", active:false, level:"n/a", cost:1, activation: "simple", drain:false },
    attributeboostagility: {name: "Attribute Boost (Agility)", active:false, level:0, cost:0.25, activation: "simple", drain:true },
    attributeboostbody: {name: "Attribute Boost (Body)", active:false, level:0, cost:0.25, activation: "simple", drain:true },
    attributeboostreaction: {name: "Attribute Boost (Reaction)", active:false, level:0, cost:0.25, activation: "simple", drain:true },
    attributebooststrength: {name: "Attribute Boost (Strength)", active:false, level:0, cost:0.25, activation: "simple", drain:true },
    combatsense: {name: "Combat Sense", active: false, level:0, cost:0.5, activation: "n/a", drain:false },
    criticalstrikeunarmed: {name: "Critical Strike (Unarmed)", active: false, level:"n/a", cost:0.5, activation: "n/a", drain:false },
    criticalstrikeclubs: {name: "Critical Strike (Clubs)", active: false, level:"n/a", cost:0.5, activation: "n/a", drain:false },
    criticalstrikeblades: {name: "Critical Strike (Blades)", active: false, level:"n/a", cost:0.5, activation: "n/a", drain:false },
    criticalstrikeastralcombat: {name: "Critical Strike (Astral Combat)", active: false, level:"n/a", cost:0.5, activation: "n/a", drain:false },
    criticalstrikeexoticweapon: {name: "Critical Strike (Exotic Weapon)", active: false, level:"n/a", cost:0.5, activation: "n/a", drain:false },
    dangersense: {name: "Danger Sense", active: false, level:0, cost:0.25, activation: "n/a", drain:false },
    enhancedperception: {name: "Enhanced Perception", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"perception", 2:"assensing"} },
    enhancedaccuracyarchery: {name: "Enhanced Accuracy (Archery)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracyautomatics: {name: "Enhanced Accuracy (Automatics)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracyblades: {name: "Enhanced Accuracy (Blades)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracyclubs: {name: "Enhanced Accuracy (Clubs)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracyexoticmelee: {name: "Enhanced Accuracy (Exotic Melee)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracyexoticranged: {name: "Enhanced Accuracy (Exotic Ranged)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracygunnery: {name: "Enhanced Accuracy (Gunnery)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracyheavyweapons: {name: "Enhanced Accuracy (Heavy Weapons)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracylongarms: {name: "Enhanced Accuracy (Longarms)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracypistols: {name: "Enhanced Accuracy (Pistols)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    enhancedaccuracythrowingweapons: {name: "Enhanced Accuracy (Throwing Weapons)", active: false, level:"n/a", cost:0.25, activation: "n/a", drain:false },
    improvedabilityarchery: {name: "Improved Ability (Archery)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"archery"}  },
    improvedabilityautomatics: {name: "Improved Ability (Automatics)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"automatics"}  },
    improvedabilityblades: {name: "Improved Ability (Blades)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"blades"}  },
    improvedabilityclubs: {name: "Improved Ability (Clubs)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"clubs"}  },
    improvedabilityexoticrangedweapon: {name: "Improved Ability (Exotic Ranged Weapon)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"exoticrangedweapon"}  },
    improvedabilityexoticmeleeweapon: {name: "Improved Ability (Exotic Melee Weapon)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"exoticmeleeweapon"}  },
    improvedabilityheavyweapons: {name: "Improved Ability (Heavy Weapons)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"heavyweapons"}  },
    improvedabilitylongarms: {name: "Improved Ability (Longarms)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"longarms"}  },
    improvedabilitypistols: {name: "Improved Ability (Pistols)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"pistols"}  },
    improvedabilitythrowingweapons: {name: "Improved Ability (Throwing Weapons)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"throwingweapons"}  },
    improvedabilityunarmedcombat: {name: "Improved Ability (Unarmed Combat)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"unarmedcombat"}  },
    improvedabilitydisguise: {name: "Improved Ability (Disguise)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"disguise"}  },
    improvedabilitydiving: {name: "Improved Ability (Diving)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"diving"}  },
    improvedabilityescapeartist: {name: "Improved Ability (Escape Artist)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"escapeartist"}  },
    improvedabilityfreefall: {name: "Improved Ability (Free Fall)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"freefall"}  },
    improvedabilitygymnastics: {name: "Improved Ability (Gymnastics)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"gymnastics"}  },
    improvedabilitypalming: {name: "Improved Ability (Palming)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"palming"}  },
    improvedabilityperception: {name: "Improved Ability (Perception)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"perception"}  },
    improvedabilityrunning: {name: "Improved Ability (Running)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"running"}  },
    improvedabilitysneaking: {name: "Improved Ability (Sneaking)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"sneaking"}  },
    improvedabilitysurvival: {name: "Improved Ability (Survival)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"survival"}  },
    improvedabilityswimming: {name: "Improved Ability (Swimming)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"swimming"}  },
    improvedabilitytracking: {name: "Improved Ability (Tracking)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"tracking"}  },
    improvedabilitycon: {name: "Improved Ability (Con)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"con"}  },
    improvedabilityetiquette: {name: "Improved Ability (Etiquette)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"etiquette"}  },
    improvedabilityimpersonation: {name: "Improved Ability (Impersonation)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"impersonation"}  },
    improvedabilityinstruction: {name: "Improved Ability (Instruction)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"instruction"}  },
    improvedabilityintimidation: {name: "Improved Ability (Intimidation)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"intimidation"}  },
    improvedabilityleadership: {name: "Improved Ability (Leadership)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"leadership"}  },
    improvedabilitynegotiation: {name: "Improved Ability (Negotiation)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"negotiation"}  },
    improvedabilityperformance: {name: "Improved Ability (Performance)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"performance"}  },
    improvedabilityaeronauticsmechanic: {name: "Improved Ability (Aeronautics Mechanic)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"aeronauticsmechanic"}  },
    improvedabilityanimalhandling: {name: "Improved Ability (Animal Handling)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"animalhandling"}  },
    improvedabilityarmorer: {name: "Improved Ability (Armorer)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"armorer"}  },
    improvedabilityartisan: {name: "Improved Ability (Artisan)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"artisan"}  },
    improvedabilityautomotivemechanic: {name: "Improved Ability (Automotive Mechanic)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"automotivemechanic"}  },
    improvedabilitybiotechnology: {name: "Improved Ability (Biotechnology)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"biotechnology"}  },
    improvedabilitychemistry: {name: "Improved Ability (Chemistry)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"chemistry"}  },
    improvedabilitycomputer: {name: "Improved Ability (Computer)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"computer"}  },
    improvedabilitycybercombat: {name: "Improved Ability (Cybercombat)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"cybercombat"}  },
    improvedabilitycybertechnology: {name: "Improved Ability (Cybertechnology)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"cybertechnology"}  },
    improvedabilitydemolitions: {name: "Improved Ability (Demolitions)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"demolitions"}  },
    improvedabilityelectronicwarfare: {name: "Improved Ability (Electronic Warfare)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"electronicwarfare"}  },
    improvedabilityfirstaid: {name: "Improved Ability (First Aid)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"firstaid"}  },
    improvedabilityforgery: {name: "Improved Ability (Forgery)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"forgery"}  },
    improvedabilityhacking: {name: "Improved Ability (Hacking)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"hacking"}  },
    improvedabilityhardware: {name: "Improved Ability (Hardware)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"hardware"}  },
    improvedabilityindustrialmechanic: {name: "Improved Ability (Industrial Mechanic)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"industrialmechanic"}  },
    improvedabilitylocksmith: {name: "Improved Ability (Locksmith)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"locksmith"}  },
    improvedabilitymedicine: {name: "Improved Ability (Medicine)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"medicine"}  },
    improvedabilitynauticalmechanic: {name: "Improved Ability (Nautical Mechanic)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"nauticalmechanic"}  },
    improvedabilitynavigation: {name: "Improved Ability (Navigation)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"navigation"}  },
    improvedabilitysoftware: {name: "Improved Ability (Software)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"software"}  },
    improvedabilitygunnery: {name: "Improved Ability (Gunnery)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"gunnery"}  },
    improvedabilitypilotaerospace: {name: "Improved Ability (Pilot Aerospace)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"pilotaerospace"}  },
    improvedabilitypilotaircraft: {name: "Improved Ability (Pilot Aircraft)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"pilotaircraft"}  },
    improvedabilitypilotwalker: {name: "Improved Ability (Pilot Walker)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"pilotwalker"}  },
    improvedabilitypilotexotic: {name: "Improved Ability (Pilot Exotic)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"pilotexotic"}  },
    improvedabilitypilotgroundcraft: {name: "Improved Ability (Pilot Ground Craft)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"pilotgroundcraft"}  },
    improvedabilitypilotwatercraft: {name: "Improved Ability (Pilot Watercraft)", active: false, level:0, cost:0.5, activation: "n/a", drain:false, skillmod:{1:"pilotwatercraft"}  },
    improvedphysicalattributebody: {name: "Improved Physical Attribute (Body)", active: false, level:0, cost:1, activation: "n/a", drain:false, attmod:{1:"body"} },
    improvedphysicalattributeagility: {name: "Improved Physical Attribute (Agility)", active: false, level:0, cost:1, activation: "n/a", drain:false, attmod:{1:"agility"} },
    improvedphysicalattributereaction: {name: "Improved Physical Attribute (Reaction)", active: false, level:0, cost:1, activation: "n/a", drain:false, attmod:{1:"reaction"} },
    improvedphysicalattributestrength: {name: "Improved Physical Attribute (Strength)", active: false, level:0, cost:1, activation: "n/a", drain:false, attmod:{1:"strength"} },
    improvedpotentialphysical: {name: "Improved Potential (Physical)", active: false, level:"n/a", cost:0.5, activation: "n/a", drain:false, limitmod:{1:"physical"} },
    improvedpotentialmental: {name: "Improved Potential (Mental)", active: false, level:"n/a", cost:0.5, activation: "n/a", drain:false, limitmod:{1:"mental"} },
    improvedpotentialsocial: {name: "Improved Potential (Social)", active: false, level:"n/a", cost:0.5, activation: "n/a", drain:false, limitmod:{1:"social"} },
    improvedreflexes: {name: "Improved Reflexes", active: false, level:0, cost:1.5, activation: "n/a", drain:false },
    improvedsense: {name: "Improved Sense", active: false, level:0, cost:0.25, activation: "n/a", drain:false },
    killinghands: {name: "Killing Hands", active: true, level:0, cost:0.5, activation: "free", drain:false },
    kinesics: {name: "Kinesics", active: false, level:0, cost:0.25, activation: "n/a", drain:false },
    lightbody: {name: "Light Body", active: false, level:0, cost:0.25, activation: "n/a", drain:false },
    missileparry: {name: "Missile Parry", active: true, level:0, cost:0.25, activation: "interrupt", drain:false },
    mysticarmor: {name: "Mystic Armor", active: false, level:0, cost:0.5, activation: "n/a", drain:false },
    naturalimmunity: {name: "Natural Immunity", active: false, level:0, cost:0.25, activation: "n/a", drain:false },
    painresistance: {name: "Pain Resistance", active: false, level:0, cost:0.5, activation: "n/a", drain:false },
    rapidhealing: {name: "Rapid Healing", active: false, level:0, cost:0.5, activation: "n/a", drain:false },
    spellresistance: {name: "Spell Resistance", active: false, level:0, cost:0.5, activation: "n/a", drain:false },
    tracelesswalk: {name: "Traceless Walk", active: false, level:0, cost:1, activation: "n/a", drain:false },
    voicecontrol: {name: "Voice Control", active: false, level:0, cost:0.5, activation: "n/a", drain:false },
    wallrunning: {name: "Wall Running", active: true, level:0, cost:0.5, activation: "simple", drain:false }
};

var p ="Physical";//type of spell
var m ="Mana";//type of spell
var spellforms = {//list of all the spells
    
    //combat spells
    acidstream: {name: "Acid Stream", category: "combat", spell: false, preparation: false, direct: false, element: "Acid", type: "Physical", range: "LOS", damage: "Physical", duration: "Instant", drain: "F-3"},
    toxicwave: {name: "Toxic Wave", category: "combat", spell: false, preparation: false, direct: false, element: "Acid", type: p, range: "LOS(A)", damage: "Physical", duration: "Instant", drain: "F-1"},
    punch: {name: "Punch", category: "combat", spell: false, preparation: false, direct: false, element: "None", type: p, range: "T", damage: "Stun", duration: "Instant", drain: "F-6"},
    clout: {name: "Clout", category: "combat", spell: false, preparation: false, direct: false, element: "None", type: p, range: "LOS", damage: "Stun", duration: "Instant", drain: "F-3"},
    blast: {name: "Blast", category: "combat", spell: false, preparation: false, direct: false, element: "None", type: p, range: "LOS(A)", damage: "Stun", duration: "Instant", drain: "F"},
    deathtouch: {name: "Death Touch", category: "combat", spell: false, preparation: false, direct: true, element: "None", type: m, range: "T", damage: "Physical", duration: "Instant", drain: "F-6"},
    manabolt: {name: "Manabolt", category: "combat", spell: false, preparation: false, direct: true, element: "None", type: m, range: "LOS", damage: "Physical", duration: "Instant", drain: "F-3"},
    manaball: {name: "Manaball", category: "combat", spell: false, preparation: false, direct: true, element: "None", type: m, range: "LOS(A)", damage: "Physical", duration: "Instant", drain: "F"},
    flamethrower: {name: "Flamethrower", category: "combat", spell: false, preparation: false, direct: false, element: "Fire", type: p, range: "LOS", damage: "Physical", duration: "Instant", drain: "F-3"},
    fireball: {name: "Fireball", category: "combat", spell: false, preparation: false, direct: false, element: "Fire", type: p, range: "LOS(A)", damage: "Physical", duration: "Instant", drain: "F-1"},
    lightningbolt: {name: "Lightning Bolt", category: "combat", spell: false, preparation: false, direct: false, element: "Electricity", type: p, range: "LOS", damage: "Physical", duration: "Instant", drain: "F-3"},
    balllightning: {name: "Ball Lightning", category: "combat", spell: false, preparation: false, direct: false, element: "Electricity", type: p, range: "LOS(A)", damage: "Physical", duration: "Instant", drain: "F-1"},
    shatter: {name: "Shatter", category: "combat", spell: false, preparation: false, direct: true, element: "None", type: p, range: "T", damage: "Physical", duration: "Instant", drain: "F-6"},
    powerbolt: {name: "Powerbolt", category: "combat", spell: false, preparation: false, direct: true, element: "None", type: p, range: "LOS", damage: "Physical", duration: "Instant", drain: "F-3"},
    powerball: {name: "Powerball", category: "combat", spell: false, preparation: false, direct: true, element: "None", type: p, range: "LOS(A)", damage: "Physical", duration: "Instant", drain: "F"},
    knockout: {name: "Knockout", category: "combat", spell: false, preparation: false, direct: true, element: "None", type: m, range: "T", damage: "Stun", duration: "Instant", drain: "F-6"},
    stunbolt: {name: "Stunbolt", category: "combat", spell: false, preparation: false, direct: true, element: "None", type: m, range: "LOS", damage: "Stun", duration: "Instant", drain: "F-3"},
    stunball: {name: "Stunball", category: "combat", spell: false, preparation: false, direct: true, element: "None", type: m, range: "LOS(A)", damage: "Stun", duration: "Instant", drain: "F"},
   //detection spells
    analyzedevice: {name: "Analyze Device", category: "detection", spell: false, preparation: false, active: "active", direction: "Directional", type: m, range: "T", duration: "Sustain", drain: "F-3"},
    analyzemagic: {name: "Analyze Magic", category: "detection", spell: false, preparation: false, active: "active", direction: "Directional", type: p, range: "T", duration: "Sustain", drain: "F-3"},
    analyzetruth: {name: "Analyze Truth", category: "detection", spell: false, preparation: false, active: "active", direction: "Directional", type: m, range: "T", duration: "Sustain", drain: "F-2"},
    clairaudience: {name: "Clairaudience", category: "detection", spell: false, preparation: false, active: "passive", direction: "Directional", type: m, range: "T", duration: "Sustain", drain: "F-3"},
    clairvoyance: {name: "Clairvoyance", category: "detection", spell: false, preparation: false, active: "passive", direction: "Directional", type: m, range: "T", duration: "Sustain", drain: "F-3"},
    combatsense: {name: "Combat Sense", category: "detection", spell: false, preparation: false, active: "active", direction: "Psychic", type: m, range: "T", duration: "Sustain", drain: "F"},
    detectenemies: {name: "Detect Enemies", category: "detection", spell: false, preparation: false, active: "active", direction: "Area", type: m, range: "T", duration: "Sustain", drain: "F-2"},
    detectenemiesextended: {name: "Detect Enemies, Extended", category: "detection", spell: false, preparation: false, active: "active", direction: "Extended Area", type: m, range: "T", duration: "Sustain", drain: "F" },
    detectindividual: {name: "Detect Individual", category: "detection", spell: false, preparation: false, active: "active", direction: "Area", type: m, range: "T", duration: "Sustain", drain: "F-3"},
    detectlife: {name: "Detect Life", category: "detection", spell: false, preparation: false, active: "active", direction: "Area", type: m, range: "T", duration: "Sustain", drain: "F-3"},
    detectlifeextended: {name: "Detect Life, Extended", category: "detection", spell: false, preparation: false, active: "active", direction: "Extended Area", type: m, range: "T", duration: "Sustain", drain: "F-1"},
    detectlifeform: {name: "Detect [Life Form]", category: "detection", spell: false, preparation: false, active: "active", direction: "Area", type: m, range: "T", duration: "Sustain", drain: "F-2"},
    detectlifeformextended: {name: "Detect [Life Form], Extended", category: "detection", spell: false, preparation: false, active: "active", direction: "Extended Area", type: m, range: "T", duration: "Sustain", drain: "F"},
    detectmagic: {name: "Detect Magic", category: "detection", spell: false, preparation: false, active: "active", direction: "Area", type: m, range: "T", duration: "Sustain", drain: "F-2"},
    detectmagicextended: {name: "Detect Magic, Extended", category: "detection", spell: false, preparation: false, active: "active", direction: "Extended Area", type: m, range: "T", duration: "Sustain", drain: "F"},
    detectobject: {name: "Detect [Object]", category: "detection", spell: false, preparation: false, active: "active", direction: "Area", type: p, range: "T", duration: "Sustain", drain: "F-2"},
    mindlink: {name: "Mindlink", category: "detection", spell: false, preparation: false, active: "active", direction: "Psychic", type: m, range: "T", duration: "Sustain", drain: "F-1"},
    mindprobe: {name: "Mind Probe", category: "detection", spell: false, preparation: false, active: "active", direction: "Directional", type: m, range: "T", duration: "Sustain", drain: "F"},
    //Health Spell
    antidote: {name: "Antidote", category: "health", spell: false, preparation: false, essence: false, type: m, range: "T", duration: "Permanent", drain: "F-3"},
    curedisease: {name: "Cure Disease", category: "health", spell: false, preparation: false, essence: true, type: m, range: "T", duration: "Permanent", drain: "F-4"},
    decreaseattribute: {name: "Decrease [Attribute]", category: "health", spell: false, preparation: false, essence: true, type: m, range: "T", duration: "Sustain", drain: "F-2"},
    detox: {name: "Detox", category: "health", spell: false, preparation: false, essence: false, type: m, range: "T", duration: "Permanent", drain: "F-6"},
    heal: {name: "Heal", category: "health", spell: false, preparation: false, essence: true, type: m, range: "T", duration: "Permanent", drain: "F-4"},
    increaseattribute: {name: "Increase [Attribute]", category: "health", spell: false, preparation: false, essence: true, type: m, range: "T", duration: "Sustain", drain: "F-3"},
    increasereflexes: {name: "Increase Reflexes", category: "health", spell: false, preparation: false, essence: true, type: m, range: "T", duration: "Sustain", drain: "F"},
    oxygenate: {name: "Oxygenate", category: "health", spell: false, preparation: false, essence: false, type: m, range: "T", duration: "Sustain", drain: "F-5"},
    prophylaxis: {name: "Prophylaxis", category: "health", spell: false, preparation: false, essence: false, type: m, range: "T", duration: "Sustain", drain: "F-4"},
    resistpain: {name: "Resist Pain", category: "health", spell: false, preparation: false, essence: false, type: m, range: "T", duration: "Permanent", drain: "F-6"},
    stabilize: {name: "Stabilize", category: "health", spell: false, preparation: false, essence: false, type: m, range: "T", duration: "Permanent", drain: "F-4"},
    //illusion spells
    agony: {name: "Agony", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Single-Sense", type: m, range: "LOS", duration: "Sustain", drain: "F-4"},
    massagony: {name: "Mass Agony", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Single-Sense", type: m, range: "LOS(A)", duration: "Sustain", drain: "F-2"},
    bugs: {name: "Bugs", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: m, range: "LOS", duration: "Sustain", drain: "F-3"},
    swarm: {name: "Swarm", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: m, range: "LOS(A)", duration: "Sustain", drain: "F-1"},
    confusion: {name: "Confusion", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: m, range: "LOS", duration: "Sustain", drain: "F-3"},
    massconfusion: {name: "Mass Confusion", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: m, range: "LOS(A)", duration: "Sustain", drain: "F-1"},
    chaos: {name: "Chaos", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: p, range: "LOS", duration: "Sustain", drain: "F-2"},
    chaoticworld: {name: "Chaotic World", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: p, range: "LOS(A)", duration: "Sustain", drain: "F"},
    entertainment: {name: "Entertainment", category: "illusion", spell: false, preparation: false, realistic: false, sense: "Multi-Sense", type: m, range: "LOS(A)", duration: "Sustain", drain: "F-3"},
    tridentertainment: {name: "Trid Entertainment", category: "illusion", spell: false, preparation: false, realistic: false, sense: "Multi-Sense", type: p, range: "LOS(A)", duration: "Sustain", drain: "F-2"},
    invisibility: {name: "Invisibility", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Single-Sense", type: m, range: "LOS", duration: "Sustain", drain: "F-2"},
    improvedinvisibility: {name: "Improved Invisibility", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Single-Sense", type: p, range: "LOS", duration: "Sustain", drain: "F-1"},
    mask: {name: "Mask", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: m, range: "T", duration: "Sustain", drain: "F-2"},
    physicalmask: {name: "Physical Mask", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: p, range: "T", duration: "Sustain", drain: "F-1"},
    phantasm: {name: "Phantasm", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: m, range: "LOS(A)", duration: "Sustain", drain: "F-1"},
    tridphantasm: {name: "Trid Phantasm", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Multi-Sense", type: p, range: "LOS(A)", duration: "Sustain", drain: "F"},
    hush: {name: "Hush", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Single-Sense", type: m, range: "LOS(A)", duration: "Sustain", drain: "F-2"},
    silence: {name: "Silence", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Single-Sense", type: p, range: "LOS(A)", duration: "Sustain", drain: "F-1"},
    stealth: {name: "Stealth", category: "illusion", spell: false, preparation: false, realistic: true, sense: "Single-Sense", type: p, range: "LOS", duration: "Sustain", drain: "F-2"},
    //manipulation spells
    animate: {name: "Animate", category: "manipulation", spell: false, preparation: false, effect: "physical", damage: false, type: p, range: "LOS", duration: "Sustain", drain: "F-1"},
    massanimate: {name: "Mass Animate", category: "manipulation", spell: false, preparation: false, effect: "physical", damage: false, type: p, range: "LOS(A)", duration: "Sustain", drain: "F+1"},
    armor: {name: "Armor", category: "manipulation", spell: false, preparation: false, effect: "physical", damage: false, type: p, range: "LOS", duration: "Sustain", drain: "F-2"},
    controlactions: {name: "Control Actions", category: "manipulation", spell: false, preparation: false, effect: "mental", damage: false, type: m, range: "LOS", duration: "Sustain", drain: "F-1"},
    mobcontrol: {name: "Mob Control", category: "manipulation", spell: false, preparation: false, effect: "mental", damage: false, type: m, range: "LOS(A)", duration: "Sustain", drain: "F+1"},
    controlthoughts: {name: "Control Thoughts", category: "manipulation", spell: false, preparation: false, effect: "mental", damage: false, type: m, range: "LOS", duration: "Sustain", drain: "F-1"},
    mobmind: {name: "Mob Mind", category: "manipulation", spell: false, preparation: false, effect: "mental", damage: false, type: m, range: "LOS(A)", duration: "Sustain", drain: "F+1"},
    fling: {name: "Fling", category: "manipulation", spell: false, preparation: false, effect: "physical", damage: true, type: p, range: "LOS", duration: "Instant", drain: "F-2"},
    icesheet: {name: "Ice Sheet", category: "manipulation", spell: false, preparation: false, effect: "environmental", damage: false, type: p, range: "LOS(A)", duration: "Instant", drain: "F"},
    ignite: {name: "Ignite", category: "manipulation", spell: false, preparation: false, effect: "physical", damage: false, type: p, range: "LOS", duration: "Permanent", drain: "F-1"},
    influence: {name: "Influence", category: "manipulation", spell: false, preparation: false, effect: "mental", damage: false, type: m, range: "LOS", duration: "Permanent", drain: "F-1"},
    levitate: {name: "Levitate", category: "manipulation", spell: false, preparation: false, effect: "physical", damage: false, type: p, range: "LOS", duration: "Sustain", drain: "F-2"},
    light: {name: "Light", category: "manipulation", spell: false, preparation: false, effect: "environmental", damage: false, type: p, range: "LOS(A)", duration: "Sustain", drain: "F-4"},
    magicfingers: {name: "Magic Fingers", category: "manipulation", spell: false, preparation: false, effect: "physical", damage: false, type: p, range: "LOS", duration: "Sustain", drain: "F-2"},
    manabarrier: {name: "Mana Barrier", category: "manipulation", spell: false, preparation: false, effect: "environmental", damage: false, type: m, range: "LOS(A)", duration: "Sustain", drain: "F-2"},
    physicalbarrier: {name: "Physical Barrier", category: "manipulation", spell: false, preparation: false, effect: "environmental", damage: false, type: p, range: "LOS(A)", duration: "Sustain", drain: "F-1"},
    poltergeist: {name: "Poltergeist", category: "manipulation", spell: false, preparation: false, effect: "environmental", damage: false, type: p, range: "LOS(A)", duration: "Sustain", drain: "F-2"},
    shadow: {name: "Shadow", category: "manipulation", spell: false, preparation: false, effect: "environmental", damage: false, type: p, range: "LOS(A)", duration: "Sustain", drain: "F-3"}
};

var complexforms = {
    cleaner: {name:"Cleaner", formact:false, target: "Persona", duration: "Permanent", fading: "L + 1"},
    diffusionattack: {name:"Diffusion [Attack]", formact:false, target: "Device", duration: "Sustained", fading: "L + 1"},
    diffusionsleaze: {name:"Diffusion [Sleaze]", formact:false, target: "Device", duration: "Sustained", fading: "L + 1"},
    diffusiondataprocessing: {name:"Diffusion [Data Processing]", formact:false, target: "Device", duration: "Sustained", fading: "L + 1"},
    diffusionfirewall: {name:"Diffusion [Firewall]", formact:false, target: "Device", duration: "Sustained", fading: "L + 1"},
    editor: {name:"Editor", formact:false, target: "File", duration: "Permanent", fading: "L + 2"},
    infusionattack: {name:"Infusion [Attack]", formact:false, target: "Device", duration: "Sustained", fading: "L + 1"},
    infusionsleaze: {name:"Infusion [Sleaze]", formact:false, target: "Device", duration: "Sustained", fading: "L + 1"},
    infusiondataprocessing: {name:"Infusion [Data Processing]", formact:false, target: "Device", duration: "Sustained", fading: "L + 1"},
    infusionfirewall: {name:"Infusion [Firewall]", formact:false, target: "Device", duration: "Sustained", fading: "L + 1"},
    staticveil: {name:"Static Veil", formact:false, target: "Persona", duration: "Sustained", fading: "L - 1"},
    pulsestorm: {name:"Pulse Storm", formact:false, target: "Persona", duration: "Immediate", fading: "L + 0"},
    puppeteer: {name:"Puppeteer", formact:false, target: "Device", duration: "Immediate", fading: "L + 4"},
    resonancechannel: {name:"Resonance Channel", formact:false, target: "Device", duration: "Sustained", fading: "L - 1"},
    resonancespike: {name:"Resonance Spike", formact:false, target: "Device", duration: "Immediate", fading: "L + 0"},
    resonanceveil: {name:"Resonance Veil", formact:false, target: "Device", duration: "Sustained", fading: "L - 1"},
    staticbomb: {name:"Static Bomb", formact:false, target: "Self", duration: "Immediate", fading: "L + 2"},
    stiches: {name:"Stiches", formact:false, target: "Sprite", duration: "Permanent", fading: "L - 2"},
    transcendentgrid: {name:"Transcendent Grid", formact:false, target: "Self", duration: "Immediate", fading: "L - 3"},
    tattletale: {name:"Tattletale", formact:false, target: "Persona", duration: "Permanent", fading: "L - 2"}
};

var weapons = {
    //blades
    combataxe: {name: "Combat axe", active: false, category:"blades", skill:"blades", accuracy: 4, accmod: 0, reach: 2, damage: 5, stat: str, dvmod: 0, damtype: "Physical", element:" ", ap:-4, avail:12, restrict:"Restricted", cost:4000},
    combatknife: {name: "Combat knife", active: false, category:"blades", skill:"blades", accuracy: 6, accmod: 0, reach: 0, damage: 2, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:-3, avail:4, restrict:" ", cost:300},
    forearmsnapblades: {name: "Forearm snap-blades", active: false, category:"blades", skill:"blades", accuracy: 4, accmod: 0, reach: 0, damage: 2, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:-2, avail:7, restrict:"Restricted", cost:200},
    katana: {name: "Katana", active: false, category:"blades", skill:"blades", accuracy: 7, accmod: 0, reach: 1, damage: 3, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:-3, avail:9, restrict:"Restricted", cost:1000},
    knife: {name: "Knife", active: false, category:"blades", skill:"blades", accuracy: 5, accmod: 0, reach: 0, damage: 1, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:-1, avail:0, restrict:" ", cost:10},
    polearm: {name: "Pole arm", active: false, category:"blades", skill:"blades", accuracy: 5, accmod: 0, reach: 3, damage: 3, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:-2, avail:6, restrict:"Restricted", cost:1000},
    survivalknife: {name: "Survival knife", active: false, category:"blades", skill:"blades", accuracy: 5, accmod: 0, reach: 0, damage: 2, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:-1, avail:0, restrict:" ", cost:100},
    sword: {name: "Sword", active: false, category:"blades", skill:"blades", accuracy: 6, accmod: 0, reach: 1, damage: 3, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:-2, avail:5, restrict:"Restricted", cost:500},
//clubs
    club: {name: "Club", active: false, category:"clubs", skill:"clubs", accuracy: 4, accmod: 0, reach: 1, damage: 3, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:0, avail:0, restrict:" ", cost:30},
    extendablebaton: {name: "Extendable Baton", active: false, category:"clubs", skill:"clubs", accuracy: 5, accmod: 0, reach: 1, damage: 2, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:0, avail:4, restrict:" ", cost:100},
    sap: {name: "Sap", active: false, category:"clubs", skill:"clubs", accuracy: 5, accmod: 0, reach: 0, damage: 2, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:0, avail:2, restrict:" ", cost:30},
    staff: {name: "Staff", active: false, category:"clubs", skill:"clubs", accuracy: 6, accmod: 0, reach: 2, damage: 3, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:0, avail:3, restrict:" ", cost:100},
    stunbaton: {name: "Stun Baton", active: false, category:"clubs", skill:"clubs", accuracy: 4, accmod: 0, reach: 1, damage: 9, stat: 0, dvmod: 0, damtype: "Stun", element: "Electricity", ap:-5, avail:6, restrict:"Restricted", cost:750},
    telescopingstaff: {name: "Telescoping Staff", active: false, category:"clubs", skill:"clubs", accuracy: 4, accmod: 0, reach: 2, damage: 2, stat: str, dvmod: 0, damtype: "Physical", element: " ", ap:0, avail:4, restrict:" ", cost:350},
    //other
    knucks: {name:"Knucks", active: false, category:"other", skill:"unarmedcombat", accuracy: phyLimit, accmod:0, reach:0, damage:1, stat: str, dvmod:0, damtype: "Physical", element: " ", ap:0, avail:2, restrict:"Restricted", cost: 100},
    monofilamentwhip: {name:"Monofilament Whip", active: false, category:"other", skill:"exoticmeleeweapon", accuracy: 5, accmod: 2, reach:2, damage:12, stat: 0, dvmod:0, damtype: "Physical", element: " ", ap:-8, avail:12, restrict:"Forbidden", cost: 10000},
    shockgloves: {name:"Shock Gloves", active: false, category:"other", skill:"unarmedcombat", accuracy: phyLimit, accmod:0, reach:0, damage:8, stat: 0, dvmod:0, damtype: "Stun", element: "Electricity", ap:-5, avail:6, restrict:"Restricted", cost: 550},
//bow
    bow:{name:"Bow", active:false, rating: 1, category:"bow", skill:"archery", accuracy:6, accmod:0, damage:str+2, stat:0, dvmod:0, damtype: "Physical", element:" ", ap:-1, avail:1, restrict: " ",cost:100},
//crossbow
    lightcrossbow: {name:"Light", active: false, category:"crossbow", skill:"archery", accuracy:7, accmod:0, damage:5, stat:0, dvmod:0, damtype: "Physical", element:" ", ap:-1, avail:2, restrict: " ",cost:300},
    mediumcrossbow: {name:"Medium", active: false, category:"crossbow", skill:"archery", accuracy:6, accmod:0, damage:7, stat:0, dvmod:0, damtype: "Physical", element:" ", ap:-2, avail:4, restrict: "Restricted",cost:500},
    heavycrossbow: {name:"Heavy", active: false, category:"crossbow", skill:"archery", accuracy:5, accmod:0, damage:10, stat:0, dvmod:0, damtype: "Physical", element:" ", ap:-3, avail:8, restrict: "Restricted",cost:1000},
//throwing weapons
    shuriken: {name:"shuriken", active: false, category:"throwingweapons", skill:"throwingweapons", rating:0, accuracy: phyLimit, accmod:0, damage:1, stat: str, dvmod:0, damtype: "Physical", element: " ", ap:-1, avail:4, restrict:"Restricted", cost: 25},
    
    //firearms
 //tasers
defianceexshocker: {name: "Defiance EX Shocker", active: false, category: "tasers", skill: "pistols", accuracy: 4, accmod: 0, damage: 9, stat: 0, dvmod: 0, damtype: "Stun", element: "Electricity", mode: {SS: "Single Shot"}, rc: 0, rcmod: 0, ammo: 4, clip: "Internal Mag", ap: -5, avail: 0, restrict: " ", cost: 250, mods: {top: "empty", barrel: "n/a", under: "n/a", internalsmart: "empty", integral: "n/a" }},
yamahapulsar: {name: "Yamaha Pulsar", active: false, category: "tasers", skill: "pistols", accuracy: 5, accmod: 0, damage: 7, stat: 0, dvmod: 0, damtype: "Stun", element: "Electricity", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 4, clip: "Internal Mag", ap: -5, avail: 0, restrict: " ", cost: 180, mods: {top: "empty", barrel: "n/a", under: "n/a", internalsmart: "empty", integral: "n/a" }},

//holdouts
fichettitigganineedler: {name: "Fichetti Tiggani Needler", active: false, category: "holdouts", skill: "pistols", accuracy: 5, accmod: 0, damage: 8, stat: 0, dvmod: 0, damtype: "Physical", element: "Flechette", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 4, clip: "Clip", ap: 5, avail: 5, restrict: "Restricted", cost: 1000, mods: {top: "n/a", barrel: "n/a", under: "n/a", internalsmart: "empty", integral: "n/a" }},
streetlinespecial: {name: "Streetline Special", active: false, category: "holdouts", skill: "pistols", accuracy: 4, accmod: 0, damage: 6, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 6, clip: "Clip", ap: 0, avail: 4, restrict: "Restricted", cost: 120, mods: {top: "n/a", barrel: "n/a", under: "n/a", internalsmart: "empty", integral: "n/a" }},
waltherpalmpistol: {name: "Walther Palm Pistol", active: false, category: "holdouts", skill: "pistols", accuracy: 4, accmod: 0, damage: 7, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire"}, rc: 0, rcmod: 0, ammo: 2, clip: "Break Action", ap: 0, avail: 4, restrict: "Restricted", cost: 180, mods: {top: "n/a", barrel: "n/a", under: "n/a", internalsmart: "empty", integral: "n/a" }},

//lightpistols
areslightfire75: {name: "Ares Light Fire 75", active: false, category: "lightpistols", skill: "pistols", accuracy: 6, accmod: 2, damage: 6, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 16, clip: "Clip", ap: 0, avail: 6, restrict: "Forbidden", cost: 1250, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "Smartgun", integral: "Silencer" }},
areslightfire70: {name: "Ares Light Fire 70", active: false, category: "lightpistols", skill: "pistols", accuracy: 7, accmod: 0, damage: 6, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 16, clip: "Clip", ap: 0, avail: 3, restrict: "Restricted", cost: 200, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "n/a" }},
beretta201t: {name: "Beretta 201T", active: false, category: "lightpistols", skill: "pistols", accuracy: 6, accmod: 0, damage: 6, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire"}, rc: 0, rcmod: 1, ammo: 21, clip: "Clip", ap: 0, avail: 7, restrict: "Restricted", cost: 210, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "n/a" }},
coltamerical36: {name: "Colt America L36", active: false, category: "lightpistols", skill: "pistols", accuracy: 7, accmod: 0, damage: 7, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 11, clip: "Clip", ap: 0, avail: 4, restrict: "Restricted", cost: 320, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "n/a" }},
fichettisecurity600: {name: "Fichetti Security 600", active: false, category: "lightpistols", skill: "pistols", accuracy: 6, accmod: 1, damage: 7, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 1, ammo: 30, clip: "Clip", ap: 0, avail: 6, restrict: "Restricted", cost: 350, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "Laser Sight" }},
taurusomni6: {name: "Taurus Omni-6", active: false, category: "lightpistols", skill: "pistols", accuracy: 5, accmod: 1, damage: 6, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 6, altammo: {damage:7, mode: {SS:"Single Shot"}, ap:-1}, clip: "Detachable Cylinder", ap: 0, avail: 3, restrict: "Restricted", cost: 300, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "Laser Sight" }},

//heavypistols
arespredatorv: {name: "Ares Predator V", active: false, category: "heavypistols", skill: "pistols", accuracy: 5, accmod: 2, damage: 8, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 15, clip: "Clip", ap: -1, avail: 5, restrict: "Restricted", cost: 725, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "Smartgun", integral: "n/a" }},
aresviperslivergun: {name: "Ares Viper Slivergun", active: false, category: "heavypistols", skill: "pistols", accuracy: 4, accmod: 0, damage: 9, stat: 0, dvmod: 0, damtype: "Physical", element: "Flechette", mode: {SA:"Semi-Automatic", BF:"Burst Fire"}, rc: 0, rcmod: 0, ammo: 15, clip: "Clip", ap: +4, avail: 8, restrict: "Forbidden", cost: 380, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "Silencer" }},
browningultrapower: {name: "Browning Ultra-Power", active: false, category: "heavypistols", skill: "pistols", accuracy: 5, accmod: 1, damage: 8, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 10, clip: "Clip", ap: -1, avail: 4, restrict: "Restricted", cost: 640, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "Laser Sight" }},
coltgovernment2066: {name: "Colt Government 2066", active: false, category: "heavypistols", skill: "pistols", accuracy: 6, accmod: 0, damage: 7, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 14, clip: "Clip", ap: -1, avail: 7, restrict: "Restricted", cost: 425, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "n/a" }},
remingtonroomsweeper: {name: "Remington Roomsweeper", active: false, category: "heavypistols", skill: "pistols", accuracy: 4, accmod: 0, damage: 7, stat: 0, dvmod: 2, damtype: "Physical", element: "", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 8, altammo: {damage:9, element: "Flechette", ap:4}, clip: "Internal Mag", ap: -1, avail: 6, restrict: "Restricted", cost: 250, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "n/a" }},
rugersuperwarhawk: {name: "Ruger Super Warhawk", active: false, category: "heavypistols", skill: "pistols", accuracy: 5, accmod: 0, damage: 9, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SS: "Single Shot"}, rc: 0, rcmod: 0, ammo: 6, clip: "Cylinder", ap: -2, avail: 4, restrict: "Restricted", cost: 400, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "n/a" }},

//machinepistols
arescrusaderii: {name: "Ares Crusader II", active: false, category: "machinepistols", skill: "automatics", accuracy: 5, accmod: 2, damage: 7, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire"}, rc: 2, rcmod: 0, ammo: 40, clip: "Clip", ap: 0, avail: 9, restrict: "Restricted", cost: 830, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "Smartgun", integral: "Gas Vent 2" }},
ceskablackscorpion: {name: "Ceska Black Scorpion", active: false, category: "machinepistols", skill: "automatics", accuracy: 5, accmod: 0, damage: 6, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire"}, rc: 0, rcmod: 1, ammo: 35, clip: "Clip", ap: 0, avail: 6, restrict: "Restricted", cost: 270, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "n/a" }},
steyrmp: {name: "Steyr MP", active: false, category: "machinepistols", skill: "automatics", accuracy: 4, accmod: 1, damage: 7, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire", FA:"Full Auto"}, rc: 0, rcmod: 0, ammo: 30, clip: "Clip", ap: 0, avail: 8, restrict: "Restricted", cost: 350, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "Laser Sight" }},

//submachineguns
coltcobratz120: {name: "Colt Cobra TZ-120", active: false, category: "submachineguns", skill: "automatics", accuracy: 4, accmod: 1, damage: 7, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire", FA:"Full Auto"}, rc: 2, rcmod: 1, ammo: 32, clip: "Clip", ap: 0, avail: 5, restrict: "Restricted", cost: 660, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "Laser Sight, Gas Vent 2" }},
fnp93praetor: {name: "FN P93 Praetor", active: false, category: "submachineguns", skill: "automatics", accuracy: 6, accmod: 0, damage: 8, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire", FA:"Full Auto"}, rc: 1, rcmod: 1, ammo: 50, clip: "Clip", ap: 0, avail: 11, restrict: "Forbidden", cost: 900, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "Flash Light," }},
hk227: {name: "HK-227", active: false, category: "submachineguns", skill: "automatics", accuracy: 5, accmod: 2, damage: 7, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire", FA:"Full Auto"}, rc: 0, rcmod: 1, ammo: 28, clip: "Clip", ap: 0, avail: 8, restrict: "Restricted", cost: 730, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "Smartgun", integral: "Silencer" }},
ingramsmartgunx: {name: "Ingram Smartgun-X", active: false, category: "submachineguns", skill: "automatics", accuracy: 4, accmod: 2, damage: 8, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {BF:"Burst Fire", FA:"Full Auto"}, rc: 2, rcmod: 0, ammo: 32, clip: "Clip", ap: 0, avail: 6, restrict: "Restricted", cost: 800, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "Smartgun", integral: "Gas Vent 2, Silencer" }},
sckmodel100: {name: "SCK Model 100", active: false, category: "submachineguns", skill: "automatics", accuracy: 5, accmod: 2, damage: 8, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire"}, rc: 0, rcmod: 1, ammo: 30, clip: "Clip", ap: 0, avail: 6, restrict: "Restricted", cost: 875, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "Smartgun", integral: "n/a" }},
uziiv: {name: "Uzi Iv", active: false, category: "submachineguns", skill: "automatics", accuracy: 4, accmod: 1, damage: 7, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {BF:"Burst Fire"}, rc: 0, rcmod: 1, ammo: 24, clip: "Clip", ap: 0, avail: 4, restrict: "Restricted", cost: 450, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "Laser Sight" }},

//assaultrifles
ak97: {name: "AK-97", active: false, category: "assaultrifles", skill: "automatics", accuracy: 5, accmod: 0, damage: 10, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire", FA:"Full Auto"}, rc: 0, rcmod: 0, ammo: 38, clip: "Clip", ap: -2, avail: 4, restrict: "Restricted", cost: 950, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "n/a" }},
aresalpha: {name: "Ares Alpha", active: false, category: "assaultrifles", skill: "automatics", accuracy: 5, accmod: 2, damage: 11, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire", FA:"Full Auto"}, rc: 2, rcmod: 0, ammo: 42, clip: "Clip", ap: -2, avail: 11, restrict: "Forbidden", cost: 2650, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "Smartgun", integral: "Grenade Launcher" }},
coltm23: {name: "Colt M23", active: false, category: "assaultrifles", skill: "automatics", accuracy: 4, accmod: 0, damage: 9, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire", FA:"Full Auto"}, rc: 0, rcmod: 0, ammo: 40, clip: "Clip", ap: -2, avail: 4, restrict: "Restricted", cost: 550, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "n/a" }},
fnhar: {name: "FN HAR", active: false, category: "assaultrifles", skill: "automatics", accuracy: 5, accmod: 1, damage: 10, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire", FA:"Full Auto"}, rc: 2, rcmod: 0, ammo: 35, clip: "Clip", ap: -2, avail: 8, restrict: "Restricted", cost: 1500, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "Laser Sight, Gas Vent 2" }},
yamaharaiden: {name: "Yamaha Raiden", active: false, category: "assaultrifles", skill: "automatics", accuracy: 6, accmod: 2, damage: 11, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {BF:"Burst Fire", FA:"Full Auto"}, rc: 1, rcmod: 0, ammo: 60, clip: "Clip", ap: -2, avail: 14, restrict: "Forbidden", cost: 2600, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "Smartgun", integral: "Silencer" }},

//sniperrifles
aresdesertstrike: {name: "Ares Desert Strike", active: false, category: "sniperrifles", skill: "longarms", accuracy: 7, accmod: 0, damage: 13, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 1, ammo: 14, clip: "Clip", ap: -4, avail: 10, restrict: "Forbidden", cost: 17500, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "Imaging Scope" }},
cavalierarmscrockettebr: {name: "Cavalier Arms Crockett EBR", active: false, category: "sniperrifles", skill: "longarms", accuracy: 6, accmod: 0, damage: 12, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire"}, rc: 0, rcmod: 1, ammo: 20, clip: "Clip", ap: -3, avail: 12, restrict: "Forbidden", cost: 10300, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "Imaging Scope" }},
rangerarmssm5: {name: "Ranger Arms SM-5", active: false, category: "sniperrifles", skill: "longarms", accuracy: 8, accmod: 0, damage: 14, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 1, ammo: 15, clip: "Clip", ap: -5, avail: 16, restrict: "Forbidden", cost: 28000, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "Imaging Scope, Silencer" }},
remington950: {name: "Remington 950", active: false, category: "sniperrifles", skill: "longarms", accuracy: 7, accmod: 0, damage: 12, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SS: "Single Shot"}, rc: 0, rcmod: 0, ammo: 5, clip: "Internal Mag", ap: -4, avail: 4, restrict: "Restricted", cost: 2100, mods: {top: "empty", barrel: "empty", under: "n/a", internalsmart: "empty", integral: "n/a" }},
ruger100: {name: "Ruger 100", active: false, category: "sniperrifles", skill: "longarms", accuracy: 6, accmod: 0, damage: 11, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 1, ammo: 8, clip: "Internal Mag", ap: -3, avail: 4, restrict: "Restricted", cost: 1300, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "Imaging Scope" }},

//shotguns
defiancet250: {name: "Defiance T-250", active: false, category: "shotguns", skill: "longarms", accuracy: 4, accmod: 0, damage: 10, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SS: "Single Shot", SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 5, clip: "Internal Mag", ap: -1, avail: 4, restrict: "Restricted", cost: 450, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "n/a" }},
enfieldas7: {name: "Enfield AS-7", active: false, category: "shotguns", skill: "longarms", accuracy: 4, accmod: 1, damage: 13, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic", BF:"Burst Fire"}, rc: 0, rcmod: 0, ammo: 10, altammo: {ammo:24, clip:"Drum"}, clip: "Clip", ap: -1, avail: 12, restrict: "Forbidden", cost: 1100, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "Laser Sight" }},
pjssmodel55: {name: "PJSS Model 55", active: false, category: "shotguns", skill: "longarms", accuracy: 6, accmod: 0, damage: 11, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 1, ammo: 2, clip: "Break Action", ap: -1, avail: 9, restrict: "Restricted", cost: 1000, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "n/a" }},

//specialweapons
aressiiisupersquirt: {name: "Ares S-III Super Squirt", active: false, category: "specialweapons", skill: "exoticrangedweapon", accuracy: 3, accmod: 0, damage: 0, stat: 0, dvmod: 0, damtype: "Chemical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 20, clip: "Clip", ap: 0, avail: 7, restrict: "Restricted", cost: 950, mods: {top: "empty", barrel: "n/a", under: "empty", internalsmart: "empty", integral: "n/a" }},
fichettipaininducer: {name: "Fichetti Pain Inducer", active: false, category: "specialweapons", skill: "exoticrangedweapon", accuracy: 3, accmod: 0, damage: 0, stat: 0, dvmod: 0, damtype: "Special", element: " ", mode: {SS: "Single Shot"}, rc: 0, rcmod: 0, ammo: 10, clip: "Special", ap: 0, avail: 11, restrict: "Restricted", cost: 5000, mods: {top: "empty", barrel: "n/a", under: "empty", internalsmart: "empty", integral: "n/a" }},
parashielddartpistol: {name: "Parashield Dart Pistol", active: false, category: "specialweapons", skill: "exoticrangedweapon", accuracy: 5, accmod: 0, damage: 0, stat: 0, dvmod: 0, damtype: "Chemical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 5, clip: "Clip", ap: 0, avail: 4, restrict: "Restricted", cost: 600, mods: {top: "empty", barrel: "n/a", under: "n/a", internalsmart: "empty", integral: "n/a" }},
parashielddartrifle: {name: "Parashield Dart Rifle", active: false, category: "specialweapons", skill: "exoticrangedweapon", accuracy: 6, accmod: 0, damage: 0, stat: 0, dvmod: 0, damtype: "Chemical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 6, clip: "Internal Mag", ap: 0, avail: 6, restrict: "Restricted", cost: 1200, mods: {top: "empty", barrel: "n/a", under: "empty", internalsmart: "empty", integral: "Imaging Scope" }},

//machineguns
ingramvaliant: {name: "Ingram Valiant", active: false, category: "machineguns", skill: "heavyweapons", accuracy: 5, accmod: 1, damage: 9, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {BF:"Burst Fire", FA:"Full Auto"}, rc: 2, rcmod: 1, ammo: 50, altammo: {ammo:100, clip:"Belt"}, clip: "Clip", ap: -2, avail: 12, restrict: "Forbidden", cost: 5800, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "Laser Sight, Gas Vent 2" }},
stoneraresm202: {name: "Stoner-Ares M202", active: false, category: "machineguns", skill: "heavyweapons", accuracy: 5, accmod: 0, damage: 10, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {FA:"Full Auto"}, rc: 0, rcmod: 0, ammo: 50, altammo: {ammo:100, clip:"Belt"}, clip: "Clip", ap: -3, avail: 12, restrict: "Forbidden", cost: 7000, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "n/a" }},
rpkhmg: {name: "RPK HMG", active: false, category: "machineguns", skill: "heavyweapons", accuracy: 5, accmod: 0, damage: 12, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {FA:"Full Auto"}, rc: 0, rcmod: 6, ammo: 50, altammo: {ammo:100, clip:"Belt"}, clip: "Clip", ap: -4, avail: 16, restrict: "Forbidden", cost: 16300, mods: {top: "empty", barrel: "empty", under: "empty", internalsmart: "empty", integral: "Tripod" }},

//cannonslaunchers
aresantioch2: {name: "Ares Antioch-2", active: false, category: "cannonslaunchers", skill: "heavyweapons", accuracy: 4, accmod: 2, damage: 0, stat: 0, dvmod: 0, damtype: "Grenade", element: " ", mode: {SS: "Single Shot"}, rc: 0, rcmod: 0, ammo: 8, clip: "Internal Mag", ap: 0, avail: 8, restrict: "Forbidden", cost: 3200, mods: {top: "empty", barrel: "n/a", under: "empty", internalsmart: "Smartgun", integral: "n/a" }},
armtechmgl12: {name: "ArmTech MGL-12", active: false, category: "cannonslaunchers", skill: "heavyweapons", accuracy: 4, accmod: 0, damage: 0, stat: 0, dvmod: 0, damtype: "Grenade", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 0, ammo: 12, clip: "Clip", ap: 0, avail: 10, restrict: "Forbidden", cost: 5000, mods: {top: "empty", barrel: "n/a", under: "empty", internalsmart: "empty", integral: "n/a" }},
aztechnologystriker: {name: "Aztechnology Striker", active: false, category: "cannonslaunchers", skill: "heavyweapons", accuracy: 5, accmod: 0, damage: 0, stat: 0, dvmod: 0, damtype: "Missile", element: " ", mode: {SS: "Single Shot"}, rc: 0, rcmod: 0, ammo: 1, clip: "Muzzle Loader", ap: 0, avail: 10, restrict: "Forbidden", cost: 1200, mods: {top: "empty", barrel: "n/a", under: "empty", internalsmart: "empty", integral: "n/a" }},
krimecannon: {name: "Krime Cannon", active: false, category: "cannonslaunchers", skill: "heavyweapons", accuracy: 4, accmod: 0, damage: 16, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SA:"Semi-Automatic"}, rc: 0, rcmod: 1, ammo: 6, clip: "Internal Mag", ap: -6, avail: 20, restrict: "Forbidden", cost: 21000, mods: {top: "empty", barrel: "n/a", under: "empty", internalsmart: "empty", integral: "n/a" }},
onotariinterceptor: {name: "Onotari Interceptor", active: false, category: "cannonslaunchers", skill: "heavyweapons", accuracy: 4, accmod: 2, damage: 0, stat: 0, dvmod: 0, damtype: "Missile", element: " ", mode: {SS: "Single Shot"}, rc: 0, rcmod: 0, ammo: 2, clip: "Muzzle Loader", ap: 0, avail: 18, restrict: "Forbidden", cost: 14000, mods: {top: "empty", barrel: "n/a", under: "empty", internalsmart: "Smartgun", integral: "n/a" }},
pantherxxl: {name: "Panther XXL", active: false, category: "cannonslaunchers", skill: "heavyweapons", accuracy: 5, accmod: 2, damage: 17, stat: 0, dvmod: 0, damtype: "Physical", element: " ", mode: {SS: "Single Shot"}, rc: 0, rcmod: 0, ammo: 15, clip: "Clip", ap: -6, avail: 20, restrict: "Forbidden", cost: 43000, mods: {top: "empty", barrel: "n/a", under: "empty", internalsmart: "Smartgun", integral: "n/a" }}
};

var ammunition = {
    //taser
    taserdart: {name:"Taser Dart", ammo:0, class:"taserammo", dammod:0, typemod:"", elemod: "", apmod:0, avail:3, restrict: "", cost:50},
    //assult cannon ammo
    assaultcannon: {name:"Assault Cannon Rounds", ammo:0, class:"cannonammo", dammod:0, typemod:"", elemod: "", apmod:0, avail:12, restrict: "Forbidden", cost:400},
    //dart guns
    dmsogel: {name:"DMSO Gel Rounds", ammo:0, class:"specialammo", dammod: 0, typemod:"", elemod: "", apmod: 1, avail: 2, restrict: "Restricted", cost: 25},
    injectiondarts: {name:"Injection Darts", ammo:0, class:"specialammo", dammod: 0, typemod:"", elemod: "", apmod: 0, avail: 4, restrict: "Restricted", cost: 75},
    //normal gun ammo
    apds: {name:"APDS", ammo:0, class:"none", dammod:0, typemod:"", elemod: "", apmod:-4, avail:12, restrict: "Forbidden", cost:120},
    explosive: {name:"Explosive Rounds", ammo:0, class:"none", dammod: 1, typemod:"", elemod: "", apmod: -1, avail: 9, restrict: "Forbidden", cost: 80},
    flechette: {name:"Flechette Rounds", ammo:0, class:"none", dammod: 2, typemod:"", elemod: "", apmod: 5, avail: 6, restrict: "Restricted", cost: 65},
    gel: {name:"Gel Rounds", ammo:0, class:"none", dammod: 0, typemod:"Stun", elemod: "", apmod: 1, avail: 2, restrict: "Restricted", cost: 25},
    hollow: {name:"Hollow Point Rounds", ammo:0, class:"none", dammod: 1, typemod:"", elemod: "", apmod: 2, avail: 4, restrict: "Forbidden", cost: 70},
    regular: {name:"Regular Ammo", ammo:0, class:"none", dammod: 0, typemod:"", elemod: "", apmod: 0, avail: 2, restrict: "Restricted", cost: 20},
    sticknshock: {name:"Stick-n-Shock", ammo:0, class:"none", dammod: -2, typemod:"Stun", elemod: "Electric", apmod: -5, avail: 6, restrict: "Restricted", cost: 80},
    tracer: {name:"Tracer Rounds", ammo:0, class:"none", dammod: 0, typemod:"", elemod: "", apmod: 0, avail: 6, restrict: "Restricted", cost: 60},
    //grenades
    flashbang: {name:"Flash-bang", ammo:0, class:"grenades", dammod:10, typemod:"Stun", elemod: "", apmod:-4, blast: "10m Radius", avail:6, restrict: "Restricted", cost:100},
    flashpak: {name:"Flash-pak", ammo:0, class:"grenades", dammod:0, typemod:"", elemod: "", apmod:0, blast: "Special", avail:4, restrict: "", cost:125},
    frag: {name:"Fragmentation", ammo:0, class:"grenades", dammod:18, typemod:"Physical", elemod: "Flechette", apmod:5, blast: "-1/m", avail:11, restrict: "Forbidden", cost:100},
    hiex: {name:"High-explosive", ammo:0, class:"grenades", dammod:16, typemod:"Physical", elemod: "", apmod:-2, blast: "-2/m", avail:11, restrict: "Forbidden", cost:100},
    gas: {name:"Gas", ammo:0, class:"grenades", dammod:"chem", typemod:"", elemod: "", apmod:0, blast: "10m Radius", avail:2, restrict: "", cost:40},
    Smoke: {name:"Smoke", ammo:0, class:"grenades", dammod:0, typemod:"", elemod: "", apmod:0, blast: "10m Radius", avail:4, restrict: "Restricted", cost:40},
    thermalsmoke: {name:"Thermal Smoke", ammo:0, class:"grenades", dammod:0, typemod:"", elemod: "", apmod:0, blast: "10m Radius", avail:6, restrict: "Restricted", cost:60},
    //rocket
    antivehicle: {name:"Anti-vehicle", ammo:0, class:"rockets", dammod:24, typemod:"Physical", elemod: "", apmod:"-4/-10", blast: "-4/m", avail:18, restrict: "Forbidden", cost:2800},
    fragrocket: {name:"Fragmentation", ammo:0, class:"rockets", dammod:24, typemod:"Physical", elemod: "Flechette", apmod:5, blast: "-1/m", avail:12, restrict: "Forbidden", cost:2000},
    hiexrocket: {name:"High-explosive", ammo:0, class:"rockets", dammod:21, typemod:"Physical", elemod: "", apmod:-2, blast: "-2/m", avail:18, restrict: "Forbidden", cost:2100}
    
};

var explosives = {
    commercial: {name: "Commercial", kg: 0, rating: 5, avail: 8, restrict:"Restricted", cost: 100},
    foam: {name: "Foam", kg: 0, rating: 6, avail: 12, restrict:"Forbidden", cost: 600},
    plastic: {name: "Plastic", kg: 0, rating: 6, avail: 16, restrict:"Forbidden", cost: 600}
};

var detonator = {name:"Detonator Cap", ammount:0, avail:8, restrict:"Restricted", cost: 75 };

var toxin = {
    teargas: {name:"CS/Tear Gas", dose:0, vector:"Contact, Inhalation", speed: "1 Combat Turn", penetration:0, power: 8, effect: "Disorientation, Nausea, Stun Damage", avail: 4, restrict: "Restricted", cost: 20},
    nausea: {name:"Nausea Gas", dose:0, vector:"Inhalation", speed: "3 Combat Turn", penetration:0, power: 9, effect: "Disorientation, Nausea", avail: 6, restrict: "Restricted", cost: 25},
    pepperpunch: {name:"Pepper Punch", dose:0, vector:"Contact, Inhalation", speed: "1 Combat Turn", penetration:0, power: 11, effect: "Nausea, Stun Damage", avail: 0, restrict: "", cost: 5}
};

var armor = {
    actioneerbusinessclothes: {name: "Actioneer Business Clothes", armor: 8, capacity: 0, avail: 8, restrict: "", cost: 1500},
    armorclothing: {name: "Armor Clothing", armor: 6, capacity: 0, avail: 2, restrict: "", cost: 450},
    armorjacket: {name: "Armor Jacket", armor: 12, capacity: 0, avail: 2, restrict: "", cost: 1000},
    armorvest: {name: "Armor Vest", armor: 9, capacity: 0, avail: 4, restrict: "", cost: 500},
    chameleonsuit: {name: "Chameleon Suit", armor: 9, capacity: 0, avail: 10, restrict: "Restricted", helm: true, cost: 1700},
    fullbodyarmor: {name: "Full body armor", armor: 15, capacity: 0, avail: 14, restrict: "Restricted", helm: false, helmmod: {armor:3, cost:500}, cost: 2000},
    linedcoat: {name: "Lined coat", armor: 9, capacity: 0, avail: 4, restrict: "", cost: 900},
    urbanexplorerjumpsuit: {name: "Urban Explorer Jumpsuit", armor: 9, capacity: 0, avail: 8, restrict: "", helm: false, helmmod: {armor:2, cost:100}, cost: 650}
};

var armormods = {
    chemicalprotection: {name: "Chemical Protection", rating:0, capacity: 0, avail:6, restrict:"", cost:250},
    chemicalseal: {name: "Chemical Seal", active: false, capacity: 6, avail:12, restrict:"Restricted", cost:3000},
    fireresistance: {name: "Fire Resistance", rating:0, capacity: 0, avail:6, restrict:"", cost:250},
    insulation: {name: "Insulation", rating:0, capacity: 0, avail:6, restrict:"", cost:250},
    nonconductivity: {name: "Nonconductivity", rating:0, capacity: 0, avail:6, restrict:"", cost:250},
    shockfrills: {name: "Shock Frills", active: false, capacity: 2, avail:6, restrict:"Restricted", cost:250},
    thermaldamping: {name: "Thermal Damping", rating:0, capacity: 0, avail:10, restrict:"Restricted", cost:500}
};

var electronics = {
    //commlinks
    metalink: {model: "Meta Link", type: "commlink", device: 1, avail: 2, cost: 100},
    sonyemperor: {model: "Sony Emperor", type:"commlink", device:2, avail: 4, cost: 700},
    renrakusensei: {model: "Renraku Sensei", type: "commlink", device:3, avail: 6, cost:1000},
    erikaelite: {model: "Erika Elite", type:"commlink", device:4, avail: 8, cost:2500},
    hermesikon: {model:  "Hermes Ikon", type: "commlink", device:5, avail: 10, cost:3000},
    transysavalon: {model: "Transys Avalon", type: "commlink", device:6, avail: 12, cost:5000},
    fairlightcaliban: {model: "Fairlight Caliban", type: "commlink", device:7, avail: 14, cost: 8000}, 
    //decks
    erikamcd1: {model: "Erika MCD-1", type: "deck", device: 1, array: [4,3,2,1], programs:1, avail:3, restrict: "Restricted", cost: 49500},
    Microdecksummit: {model: "Microdeck Summit", type: "deck", device: 1, array: [4,3,3,1], programs:1, avail: 3, restrict: "Restricted", cost: 58000},
    Microtronicaazteca200: {model: "Microtronica Azteca 200", type: "deck", device: 2, array: [5,4,3,2], programs: 2, avail: 6, restrict: "Restricted", cost: 110250},
    Hermeschariot: {model: "Hermes Chariot", type: "deck", device: 2, array: [5,4,4,2], programs: 2, avail: 6, restrict: "Restricted", cost: 123000},
    Novtechnavigator: {model: "Novtech Navigator", type: "deck", device: 3, array: [6,5,4,3], programs: 3, avail: 6, restrict: "Restricted", cost: 205750},
    Renrakutsurugi: {model: "Renraku Tsurugi", type: "deck", device: 3, array: [6,5,5,3], programs: 3, avail: 9, restrict: "Restricted", cost: 214125},
    Sonyciy720: {model: "Sony CIY-720", type: "deck", device: 4, array: [7,6,5,4], programs: 4, avail: 12, restrict: "Restricted", cost: 345000},
    Shiawase: {model: "Shiawase Cyber-5", type: "deck", device: 5, array: [8,7,6,5], programs: 5, avail: 15, restrict: "Restricted", cost: 549375},
    Fairlightexcalibur: {model: "Fairlight Excalibur", type: "deck", device: 6, array: [9,8,7,6], programs: 6, avail: 18, restrict: "Restricted", cost: 823250},
     //RCC
    scratchbuiltjunk: {model: "Scratch-Built Junk", type: "rcc", device: 1, dataprocess: 3, firewall: 2, avail: 2, restrict: "Restricted", cost: 1400},
    Radioshackremotecontroller: {model: "Radio Shack Remote Controller", type: "rcc", device: 2, dataprocess: 3, firewall: 3, avail:6, restrict: "Restricted", cost: 8000},
    Essymotorsdronemaster: {model: "Essy Motors DroneMaster", type: "rcc", device: 3, dataprocess: 4, firewall: 4, avail: 6, restrict: "Restricted", cost:16000},
    Compuforcetaskmaster: {model: "CompuForce TaskMaster", type: "rcc", device: 4, mods:{}, dataprocess: 5, firewall: 4, avail: 8, restrict: "Restricted", cost: 32000},
    Maerskspider: {model:"Maersk Spider", type: "rcc", device: 4, dataprocess: 4, firewall: 5, avail: 8, restrict: "Restricted", cost: 34000},
    Maserindustrialelectronics: {model: "Maser Industrial Electronics", type: "rcc", device: 5, dataprocess: 3, firewall: 4, avail: 8, restrict: "Restricted", cost: 64000},
    Vulcanliegelord: {model: "Vulcan Liegelord", type: "rcc", device: 5, dataprocess: 5, firewall: 6, avail: 10, restrict: "Restricted", cost: 66000},
    Proteusposeidon: {model: "Proteus Poseidon", type: "rcc", device: 5, dataprocess: 5, firewall: 6, avail: 12, restrict: "Restricted", cost: 68000},
    Lonestarremotecommander:{model: "Lone Star Remote Commander", type: "rcc", device: 6, dataprocess: 6, firewall: 5, avail: 14, restrict: "Restricted", cost: 75000},
    Mctdroneweb: {model: "MCT Drone Web", type: "rcc", device: 6, dataprocess: 7, firewall: 6, avail: 16, restrict: "Restricted", cost: 95000},
    Trioxubermensch: {model: "Triox UberMensch", type: "rcc", device: 6, dataprocess: 8, firewall: 7, avail: 18, restrict: "Restricted", cost: 140000},
    
    //accessories
    argloves: {name:"AR Gloves", type:"accessory", device:3, avail:0, cost:150},
    biometricreader: {name:"Biometric reader", type:"accessory", device:3, avail:4, cost:200},
    electronicpaper: {name:"Electronic paper", type:"accessory", device:1, avail:0, cost:5},
    printer: {name:"Printer", type:"accessory", device:3, avail:0, cost:25},
    satellitelink: {name:"Satellite link", type:"accessory", device:4, avail:6, cost:500},
    simrig: {name:"Simrig", type:"accessory", device:3, avail:12, cost:1000},
    subvocalmic: {name:"Subvocal mic", type:"accessory", device:3, avail:4, cost:50},
    tridprojector: {name:"Trid Projector", type:"accessory", device:3, avail:0, cost:200},
    trodes: {name:"Trodes", type:"accessory", device:3, avail:0, cost:70},
    
    //RFID
    standardtag: {name:"Standard Tag", type:"rfid", device:1, avail:0, restrict:"", cost:1},
    datachip: {name:"Datachip", type:"rfid", device:1, avail:0, restrict:"", cost:5},
    securitytags: {name:"Security Tags", type:"rfid", device:3, avail:0, restrict:"", cost:5},
    sensortags: {name:"Sensor Tags", type:"rfid", device:2, avail:5, restrict:"", cost:40},
    stealthtags: {name:"Stealth Tags", type:"rfid", device:3, avail:7, restrict:"Restricted", cost:10},

    //communications
    bugscanner: {name:"Bug Scanner", type:"communication", rating:1, availx:1, avail:1, restrict: "Restricted", costx:100, cost:100},//availx and costx are the multiplier for rating
    datatap: {name:"Data Tap", type:"communication", avail: 6, restrict:"Restricted", cost:300},
    headjammer: {name:"Headjammer", type:"communication", rating:1, availx:1, avail:1, restrict: "Restricted", costx:150, cost:150},
    jammerarea: {name:"Jammer, area", type:"communication", rating:1, availx:3, avail:3, restrict: "Forbidden", costx:200, cost:200},
    jammerdirectional: {name:"Jammer, directional", type:"communication", rating:1, availx:2, avail:2, restrict: "Forbidden", costx:200, cost:200},
    microtransciever: {name:"Micro-transciever", type:"communication", avail:2, restrict:"", costx:100, cost:100},
    tageraser: {name:"Tag eraser", type:"communication", avail:6, restrict: "Restricted", cost:450},
    whitenoisegenerator: {name:"White noise generator", type:"communication", rating:1, availx:1, avail:1, restrict:"", costx:50, cost:50},

//credsticks
     standard: {name:"Standard", type:"credsticks", maxvalue:"5,000", avail:0, restrict:"", cost:5},
     silvercredstick: {name:"Silver", type:"credsticks", maxvalue:"20,000", avail:0, restrict:"", cost:20},
     goldcredstick: {name:"Gold", type:"credsticks", maxvalue:"100,000", avail:5, restrict:"", cost:100},
     platinumcredstick: {name:"Platinum", type:"credsticks", maxvalue:"500,000", avail:10, restrict:"", cost:500},
     ebonycredstick: {name:"Ebony", type:"credsticks", maxvalue:"1,000,000", avail:20, restrict:"", cost:1000},
     
       //licenses and SINS
    fakesin: {name:"Fake SIN", id:"", type:"identification", rating:1, avail:3, availx:3, restrict:"Forbidden", costx:2500, cost:2500},
    fakelicense: {name:"Fake License", id:"", type:"identification", rating:1, avail:3, availx:3, restrict:"Forbidden", costx:200, cost:200},

//Tools
    toolkit: {name:"Kit", type:"tools", avail:0, restrict:"", cost:500},
    toolshop: {name:"Shop", type:"tools", avail:8, restrict:"", cost:5000},
    toolfacility: {name:"Facility", type:"tools", avail:12, restrict:"", cost:5000},

//Security devices
    keycombinationlock: {name:"Key/combination lock", type:"securitydevice", rating:1, avail:1, restrict:"", cost:10},
    maglock: {name:"Maglock", type:"securitydevice", rating:1, avail:1, restrict:"", cost:100},
    keypad: {name:"Keypad", type:"securitydevice", avail:0, restrict:"", cost:50},
    cardreader: {name:"Card reader", type:"securitydevice", avail:0, restrict:"", cost:50},
    antitampercircuits: {name:"Anti-tamper circuits", type:"securitydevice", rating:1, avail:1, restrict:"", cost:250},
//antitampercircuits should add to the rating to whatver they're purchased for.


//restraints
    metalrestraint: {name:"Metal", type:"restraints", avail:0, restrict:"", cost:20},
    plasteelrestraint: {name:"Plasteel", type:"restraints", avail:6, restrict:"Restricted", cost:50},
    plasticrestraint: {name:"Plastic (per 10)", type:"restraints", avail:0, restrict:"", cost:5},
    containmentmanacles: {name:"Containment manacles", type:"restraints", avail:6, restrict:"Restricted", cost:250},

//b&e gear
    autopicker: {name:"Autopicker", type:"bnegear", rating:1, avail:8, restrict:"Restricted", cost:500},
    cellularglovemolder: {name:"Cellular glove molder", type:"bnegear", rating:1, avail:12, restrict:"Forbidden", cost:500},
    chisel: {name:"Chisel", type:"bnegear", avail:0, restrict:"", cost:20},
    crowbar: {name:"Crowbar", type:"bnegear", avail:0, restrict:"", cost:20},
    keycardcopier: {name:"Keycard Copier", type:"bnegear", rating:1, avail:8, restrict:"Forbidden", cost:600},
    lockpickset: {name:"Lockpick set", type:"bnegear", avail:4, restrict:"Restricted", cost:250},
    maglockpasskey: {name:"Maglock passkey", type:"bnegear", rating:1, avail:3, restrict:"Forbidden", cost:2000},
    miniwelder: {name:"Miniwelder", type:"bnegear", avail:2, restrict:"", cost:250},
    miniwelderfuel: {name:"Miniwelder fuel canister", type:"bnegear", avail:2, restrict:"", cost:80},
    monofilamentchainsaw: {name:"Monofilament chainsaw", type:"bnegear", avail:8, restrict:"", cost:500},
    sequencer: {name:"Sequencer", type:"bnegear", rating:1,  avail:3, restrict:"Forbidden", cost:250},

//industrial chemicals
    gluesolvent: {name:"Glue Solvent", type:"chemicals", avail:2, restrict:"", cost:90},
    gluesprayer: {name:"Glue Sprayer", type:"chemicals", avail:2, restrict:"", cost:150},
    thermiteburningbar: {name:"Thermite burning bar", avail:16, restrict:"Restricted", cost:500},

//survival gear
    chemsuit: {name:"Chemsuit", type:"survivalgear", rating:1, avail:2, restrict:"", cost:150},
    climbinggear: {name:"Climbing gear", type:"survivalgear", avail:0, restrict:"", cost:200},
    divinggear: {name:"Diving gear", type:"survivalgear", avail:6, restrict:"", cost:2000},
    flashlight: {name:"Flashlight", type:"survivalgear", avail:0, restrict:"", cost:25},
    gasmask: {name:"Gas mask", type:"survivalgear", avail:0, restrict:"", cost:200},
    geckotapegloves: {name:"Gecko tape gloves", type:"survivalgear",  avail:12, restrict:"", cost:250},
    hazmatsuit: {name:"Hazmat suit", type:"survivalgear",  avail:8, restrict:"", cost:3000},
    lightstick: {name:"Chemsuit", type:"survivalgear", avail:0, restrict:"", cost:25},
    magnesiumtorch: {name:"Magnesium torch", type:"survivalgear", avail:0, restrict:"", cost:5},
    microflarelauncher: {name:"Micro flare launcher", type:"survivalgear", avail:0, restrict:"", cost:175},
    microflares: {name:"Micro flares", type:"survivalgear", avail:0, restrict:"", cost:25},
    rappellinggloves: {name:"Rappelling gloves", type:"survivalgear", avail:0, restrict:"", cost:50},
    respirator: {name:"Respirator", type:"survivalgear", rating:1, avail:0, restrict:"", cost:50},
    survivalkit: {name:"Survival Kit", type:"survivalgear", avail:4, restrict:"", cost:200},

//grapple gun gear
    grapplegun: {name:"Grapple gun", type:"grapplegungear", avail:8, restrict:"Restricted", cost:500},
    catalyststick: {name:"Catalyst stick", type:"grapplegungear", avail:8, restrict:"Forbidden", cost:500},
    microwire: {name:"Microwire", type:"grapplegungear", avail:4, restrict:"", cost:500},
    myomericrope: {name:"Myomeric rope", type:"grapplegungear", avail:10, restrict:"", cost:500},
    standardrope: {name:"Standard rope", type:"grapplegungear", avail:0, restrict:"", cost:500},
    stealthrope: {name:"Stealth rope", type:"grapplegungear", avail:8, restrict:"Forbidden", cost:500},

//biotech
    biomonitor: {name:"Biomonitor", type:"biotech", avail:3, restrict:"", cost:300},
    disposablesyringe: {name:"Disposable syringe", type:"biotech", avail:3, restrict:"", cost:10},
    medkit: {name:"Medkit", type:"biotech", rating:1, avail:1, restrict:"", cost:250},
    medkitsupplies: {name:"Medkit supplies", type:"biotech", avail:0, restrict:"", cost:100},

//docwagon contract
    basiccontract: {name:"Basic", type:"docwagon", avail:0, restrict:"", cost:5000},
    goldontract: {name:"Gold", type:"docwagon", avail:0, restrict:"", cost:25000},
    platinumontract: {name:"Platinum", type:"docwagon", avail:0, restrict:"", cost:50000},
    superplatinumontract: {name:"Super-platinum", type:"docwagon", avail:0, restrict:"", cost:100000},

//slap patches
    antidotepatch: {name:"Antidote patch", type:"slappatches", rating:1, avail:1, restrict:"", cost:50},
    chempatch: {name:"Chem patch", type:"slappatches", avail:6, restrict:"", cost:200},
    stimpatch: {name:"Stim patch", type:"slappatches", avail:2, restrict:"", cost:25},
    tranqpatch: {name:"Tranq patch", type:"slappatches", avail:2, restrict:"", cost:20},
    traumapatch: {name:"Trauma patch", type:"slappatches", avail:6, restrict:"", cost:500},
};

var software = {
    datasoft: {},
    mapsoft: {},
    shopsoft: {},
    tutorsoft: {}
};

var programs = {
    //common
    browser: {name:"Browser", active: false, category: "common", rcc: true, test: "Matrix Search"},
    configurator: {name:"Configurator", active: false, catergoy: "common", rcc: false},
    edit: {name:"Edit", active: false, category: "common", rcc: false, test: "Edit", mod: 2},
    encryption: {name:"Encryption", active: false, category: "common", rcc: false, firewall: 1},
    signalscrub: {name:"Signal Scrub", active: false, category: "common", rcc: true, noisereduction: 2},
    toolbox: {name:"Toolbox", active: false, category: "common", rcc: true, dataprocessing: 1},
    virtualmachine: {name:"Virtual Machine", active: false, category: "common", rcc: true, programs: 2, damagetaken: 1},
    //hacking
    armor: {name: "Armor", active: false, category: "hacking", rcc: true, test: "Resist Matrix Damage", mod: 2},
    babymonitor: {name:"Baby Monitor", active: false, category: "hacking", rcc: false},
    biofeedback: {name:"Biofeedback", active: false, category: "hacking", rcc: false},
    biofeedbackfilter: {name:"Biofeedback Filter", active: false, category: "hacking", rcc: true, test: "Resist Biofeedback Damage", mod: 2},
    blackout: {name:"Blackout", active: false, category: "hacking", rcc: false},
    decryption: {name:"Decryption", active: false, category: "hacking", rcc: false, attack: 1},
    defuse: {name:"Defuse", active: false, category: "hacking", rcc: false, test: "Resist Data Bomb Damage", mod: 4},
    demolition: {name:"Demolition", active: false, category: "hacking", rcc: false, databombrating:1},
    exploit: {name:"Exploit", active: false, category: "hacking", rcc: false, test: "Hack On The Fly", mod: 2},
    fork: {name:"Fork", active: false, category: "hacking", rcc: false},
    guard: {name:"Guard", active: false, category: "hacking", rcc: true},
    hammer: {name:"Hammer", active: false, category: "hacking", rcc: false, matrixdamage: 2},
    lockdown: {name:"Lockdown", active: false, category: "hacking", rcc: false},
    mugger: {name:"Mugger", active: false, category: "hacking", rcc: false},
    shell: {name:"Shell", active: false, category: "hacking", rcc: true, test: "Resist Matrix Damage, Resist Biofeedback Damage", mod: 1},
    sneak:{name:"Sneak", active: false, category: "hacking", rcc: true, test: "Defend Trace User", mod: 2},
    stealth:{name:"Stealth", active: false, category: "hacking", rcc: false, sleaze: 1},
    track:{name:"Track", active: false, category: "hacking", rcc: false, test: "Trace User", mod: 2},
    wrapper:{name:"Wrapper", active: false, category: "hacking", rcc: true}
};

inventory = {};

setUpSkills ();


$(".a, .b, .c, .d, .e").click( //This controls the Priority table
    selectPriority
);

function selectPriority() { //Priority table controls
    var classPrior; //this is the class of what was clicked
    var priorityL; //Priority Level, holds which priority goes into which level
    
    fnselect ($(this));
    
    if ( $(this).hasClass('a') ) {//I need to figure out how to make this a switch later.
        classPrior="a";
    }
    if ( $(this).hasClass('b') ) {
        classPrior="b";
    }
    if ( $(this).hasClass('c') ) {
        classPrior="c";
    }
    if ( $(this).hasClass('d') ) {
        classPrior="d";
    }
    if ( $(this).hasClass('e') ) {
        classPrior="e";
    }
    
    var className = $(this).attr("class");
    switch(className){
        case 'metatype '+ classPrior +' selected':
            priorityL="metatype";
            break;
        case 'attribute '+ classPrior +' selected':
            priorityL="attribute";
            break;
        case 'magres '+ classPrior +' selected':
            priorityL="magres";
            break;
        case 'skillz '+ classPrior +' selected':
            priorityL="skillz";
            break;
        case 'resource '+ classPrior +' selected':
            priorityL="resource";
            break;
        case 'prilevel '+ classPrior +' selected':
            priorityL="prilevel";
            break;
        default:
            priorityL="prilevel";
            break;
    }
    if ( $(this).hasClass('a') ) {
        priorityA = priorityL;
        deactivate(priorityL, $(this));
    }
    if ( $(this).hasClass('b') ) {
        priorityB = priorityL;
        deactivate(priorityL, $(this));
    }
    if ( $(this).hasClass('c') ) {
        priorityC = priorityL;
        deactivate(priorityL, $(this));
    }
    if ( $(this).hasClass('d') ) {
        priorityD = priorityL;
        deactivate(priorityL, $(this));
    }
    if ( $(this).hasClass('e') ) {
        priorityE = priorityL;
        deactivate(priorityL, $(this));
    }
    function deactivate(x,y) {
        $("."+ x).addClass("deact");
        y.removeClass("deact");
    }
    
    switch(priorityA){
        case "metatype":
            activateMT(".human");
            activateMT(".elf");
            activateMT(".dwarf");
            activateMT(".ork");
            activateMT(".troll");
            break;
        case "attribute":
            attribute=24;
            pointUpdater (".pnt", attribute);
            break;
        case "magres":
            activateMT(".mage");
            activateMT(".techno");
            activateMT(".mystic");
            deactivateMT(".adept");
            deactivateMT(".aspect");
            break;
        case "skillz":
            skillgroups=10;
            skills=46;
            break;
        case "resource":
            nuyen=450000;
            break;
    }
    switch(priorityB){
        case "metatype":
            activateMT(".human");
            activateMT(".elf");
            activateMT(".dwarf");
            activateMT(".ork");
            activateMT(".troll");
            break;
        case "attribute":
            attribute=20;
            pointUpdater (".pnt", attribute);
            break;
        case "magres":
            activateMT(".mage");
            activateMT(".techno");
            activateMT(".mystic");
            activateMT(".adept");
            activateMT(".aspect");
            break;
        case "skillz":
            skillgroups=5;
            skills=36;
            break;
        case "resource":
            nuyen=275000;
            break;
    }
    switch(priorityC){
        case "metatype":
            activateMT(".human");
            activateMT(".elf");
            activateMT(".dwarf");
            activateMT(".ork");
            deactivateMT(".troll");
            break;
        case "attribute":
            attribute=16;
            pointUpdater (".pnt", attribute);
            break;
        case "magres":
            activateMT(".mage");
            activateMT(".techno");
            activateMT(".mystic");
            activateMT(".adept");
            activateMT(".aspect");
            break;
        case "skillz":
            skillgroups=2;
            skills=28;
            break;
        case "resource":
            nuyen=140000;
            break;
    }
    switch(priorityD){
        case "metatype":
            activateMT(".human");
            activateMT(".elf");
            deactivateMT(".dwarf");
            deactivateMT(".ork");
            deactivateMT(".troll");
            break;
        case "attribute":
            attribute=14;
            pointUpdater (".pnt", attribute);
            break;
        case "magres":
            deactivateMT(".mage");
            deactivateMT(".techno");
            deactivateMT(".mystic");
            activateMT(".adept");
            activateMT(".aspect");
            break;
        case "skillz":
            skillgroups=0;
            skills=22;
            break;
        case "resource":
            nuyen=50000;
            break;
    }
    switch(priorityE){
        case "metatype":
            activateMT(".human");
            deactivateMT(".elf");
            deactivateMT(".dwarf");
            deactivateMT(".ork");
            deactivateMT(".troll");
            break;
        case "attribute":
            attribute=12;
            pointUpdater (".pnt", attribute);
            break;
        case "magres":
            deactivateMT(".mage");
            deactivateMT(".techno");
            deactivateMT(".mystic");
            deactivateMT(".adept");
            deactivateMT(".aspect");
            break;
        case "skillz":
            skillgroups=0;
            skills=18;
            break;
        case "resource":
            nuyen=6000;
            break;
    }
    
    function activateMT(x) {
        $(x).removeClass("deact");
    }
    function deactivateMT(x) {
        $(x).addClass("deact");
    }
    attDisplay();
}

function fnselect (x) {//fucntion for highlighting what has been selected
    x.siblings().removeClass("selected");
    x.addClass('selected');
}

$(".human, .elf, .dwarf, .ork, .troll").click(//this part will call the metatype select fuction when a metatype button is clicked
    selectMetatype
);

function selectMetatype() { //Metatype controls
    if ($(this).hasClass('deact')) {//this will make it so that if the button is deactivated that it won't do anything
        return;
    }
    else {
        fnselect ($(this));//highlights what's been clicked on
        
        if ( $(this).hasClass('human') ) {//this stuff sets the metatype attrabutes and stuff
            resetAtt ();
            metatype="human";
            edg=2;
            edgmax=7;
            edgmin=2;
            attDisplay();
            $("#racial").empty().append($("<p>None<br>Boring</p>"));
            switch ("metatype") {
                case priorityA:
                    specAttribute = 9;
                    break;
                case priorityB:
                    specAttribute = 7;
                    break;
                case priorityC:
                    specAttribute = 5;
                    break;
                case priorityD:
                    specAttribute = 3;
                    break;
                case priorityE:
                    specAttribute = 1;
                    break;
            }
        }
        if ( $(this).hasClass('elf') ) {
            resetAtt ();
            metatype="elf";
            agi=2;
            cha=3;
            agimax=7;
            agimin=2;
            chamax=8;
            chamin=3;
            attDisplay();
            $("#racial").empty().append($("<p>Low-Light Vision</p>"));
            switch ("metatype") {
                case priorityA:
                    specAttribute = 8;
                    break;
                case priorityB:
                    specAttribute = 6;
                    break;
                case priorityC:
                    specAttribute = 3;
                    break;
                case priorityD:
                    specAttribute = 0;
                    break;
            }
        }
        if ( $(this).hasClass('dwarf') ) {
            resetAtt ();
            metatype="dwarf";
            bod=3;
            str=3;
            wil=2;
            bodmax=8;
            reamax=5;
            strmax=8;
            wilmax=7;
            bodmin=3;
            strmin=3;
            wilmin=2;
            attDisplay();
            $("#racial").empty().append($("<p>Thermographic Vision<br>+2 Pathogen/Toxic Resist<br>20% Lifestyle increase</p>"));
            switch ("metatype") {
                case priorityA:
                    specAttribute = 7;
                    break;
                case priorityB:
                    specAttribute = 4;
                    break;
                case priorityC:
                    specAttribute = 1;
                    break;
            }
            
        }
        if ( $(this).hasClass('ork') ) {
            resetAtt ();
            metatype="ork";
            bod=4;
            str=3;
            bodmax=9;
            strmax=8;
            logmax=5;
            chamax=5;
            bodmin=4;
            strmin=3;
            attDisplay();
            $("#racial").empty().append($("<p>Low-Light Vision</p>"));
            switch ("metatype") {
                case priorityA:
                    specAttribute = 7;
                    break;
                case priorityB:
                    specAttribute = 4;
                    break;
                case priorityC:
                    specAttribute = 0;
                    break;
            }
            
        }
        if ( $(this).hasClass('troll') ) {
            resetAtt ();
            metatype="troll";
            bod=5;
            str=5;
            bodmax=10;
            strmax=10;
            agimax=5;
            logmax=5;
            intmax=5;
            chamax=4;
            bodmin=5;
            strmin=5;
            reachmod=1;
            attDisplay();
            $("#racial").empty().append($("<p>Thermographic Vision<br>+1 Reach<br>+1 Dermal Armor<br>100% Lifestyle increase</p>"));
            switch ("metatype") {
                case priorityA:
                    specAttribute = 5;
                    break;
                case priorityB:
                    specAttribute = 0;
                    break;
            }
        }
        
        attDisplay();
    }
}

function resetAtt () {//reset attrabute to default
    bod=1;
    agi=1;
    rea=1;
    str=1;
    wil=1;
    log=1;
    int=1;
    cha=1;
    edg=1;
     bodmin=1;
     agimin=1;
     reamin=1;
     strmin=1;
     wilmin=1;
     logmin=1;
     intmin=1;
     chamin=1;
     edgmin=1;
     bodmax=6;
     agimax=6;
     reamax=6;
     strmax=6;
     wilmax=6;
     logmax=6;
     intmax=6;
     chamax=6;
     edgmax=6;
     reachmod=0;
}
//there are 10 types of people in this world. Those who understand binary, and those who don't
attDisplay();//runs the attrabute display funcation on start up

function nuyenUpdater() {
    $("#nuyen").empty().append($("<strong>"+nuyen+"&#65509</strong>"));
}

function attDisplay () {//adds the attrabutes to the attrabute table
    renderAttStat (augbod, "bod", bod, bodmax);
    renderAttStat (augagi, "agi", agi, agimax);
    renderAttStat (augrea, "rea", rea, reamax);
    renderAttStat (augstr, "str", str, strmax);
    renderAttStat (augwil, "wil", wil, wilmax);
    renderAttStat (auglog, "log", log, logmax);
    renderAttStat (augint, "int", int, intmax);
    renderAttStat (augcha, "cha", cha, chamax);
    renderSpecStat ("edg", edg, edgmax);
    renderSpecStat ("mag", magic, magmax);
    renderSpecStat ("res", resonance, resmax);
    pointUpdater (".pnt", attribute);
    pointUpdater (".spePnt",specAttribute);
    phyLimit = renderLimit (phyLimitMod,"phyLimit", str+augstr, bod+augbod, rea+augrea);
    socLimit = renderLimit (socLimitMod, "socLimit", cha, wil, ess);
    menLimit = renderLimit (menLimitMod, "menLimit", log, int, wil);
    iniphy = initiativeRenderMonkey (rea,"meatini", iniphyDice,augrea);
    iniast = initiativeRenderMonkey (int,"magicini", iniastDice, augint);
    inimat = initiativeRenderMonkey (dataP,"coldmatini", inimatcold, 0);
    inimat = initiativeRenderMonkey (dataP,"hotmatini", inimathot, 0);
    renderSkills ();//this updates everything that uses a for loop
    $("#skillpnt").empty().append($("<strong>"+skills+"/"+skillgroups+"</strong>"));
    pointUpdater("#knowpnt",knowledgepoints);
    pointUpdater("#powerpnt",powerPoints);
    pointUpdater("#spellpnt",spells);
    pointUpdater("#formpnt",forms);
    pointUpdater("#karmapnt",karma);
    nuyenUpdater();
}

function pointUpdater(x,y) {
    $(x).empty().append($("<strong>"+y+"</strong>"));
}
    
function renderAttStat (w, x, y, z) {//this shows the current level of an attrabute and the attrabute max
    var augment=y+w;
    $("."+ x + " .stats").empty().append($("<span>"+y+"/"+z+"("+augment+")"+"</span>"));
}

function renderSpecStat (x, y, z) {//this is for special stats like edge, mag, and res
    $("."+ x + " .stats").empty().append($("<span>"+y+"/"+z+"</span>"));
}

function initiativeRenderMonkey(x,y,z,w) {
    if (magres=="technomancer") {
        dataP=log;
    }
    var ini = int+augint + x + w;
    $("."+y).empty().append($("<strong>"+ini+"+"+z+"D6</strong>"));
    return ini;
}

function renderLimit (v,w,x,y,z) {//function for showing and calculating limits
    var limit = (x*2+y+z)/3;
    limit=Math.ceil(limit);//this rounds up
    $("."+ w).empty().append($("<strong>"+limit+"("+(limit+v)+")"+"</strong>"));
    return limit;
}

$("#container").on("click",".incAtt, .decAtt",
    changeAtt
);

var phyAttMax=false;
var menAttMax=false;

function changeAtt () {//this function changes the attrabutes
    
    var className = $(this).attr("class");
    switch(className){//This switch statement is SO LONG!
        case 'incAtt Bod':
            bod = increasePhy(bod, bodmax);
            break;
        case 'incAtt Agi':
            agi = increasePhy(agi, agimax);
            break;
        case 'incAtt Rea':
            rea = increasePhy(rea, reamax);
            break;
        case 'incAtt Str':
            str = increasePhy(str, strmax);
            break;
        case 'incAtt Wil':
            wil = increaseMen(wil, wilmax);
            break;
        case 'incAtt Log':
            log = increaseMen(log, logmax);
            knowingIsHalftheBattle();//update the number of knowledge skills
            break;
        case 'incAtt Int':
            int = increaseMen(int, intmax);
            knowingIsHalftheBattle();//update the number of knowledge skills
            break;
        case 'incAtt Cha':
            cha = increaseMen(cha, chamax);
            break;
        case 'decAtt Bod':
            bod = decreasePhy(bod, bodmin, bodmax);
            break;
        case 'decAtt Agi':
            agi = decreasePhy(agi, agimin, agimax);
            break;
        case 'decAtt Rea':
            rea = decreasePhy(rea, reamin, reamax);
            break;
        case 'decAtt Str':
            str = decreasePhy(str, strmin, strmax);
            break;
        case 'decAtt Wil':
            wil = decreaseMen(wil, wilmin, wilmax);
            break;
        case 'decAtt Log':
            log = decreaseMen(log, logmin, logmax);
            knowingIsHalftheBattle();//update the number of knowledge skills
            break;
        case 'decAtt Int':
            int = decreaseMen(int, intmin, intmax);
            knowingIsHalftheBattle ();//update the number of knowledge skills
            break;
        case 'decAtt Cha':
            cha = decreaseMen(cha, chamin, chamax);
            break;
        case 'incAtt Edg':
            edg = increaseSpec(edg, edgmax);
            break;
        case "incAtt Mag":
            if (magres=="adept"&&magic<magmax) {
                powerPoints++;
            }
            magic= increaseSpec(magic,magmax);
            fociMaxRating=magic*2;
            break;
        case "incAtt Res":
            resonance= increaseSpec(resonance,resmax);
            break;
        case "decAtt Edg":
            edg = decreaseSpec(edg,edgmin);
            break;
        case "decAtt Mag":
            if (magres=="adept"&&magic>magmin) {
                powerPoints--;
            }
            magic = decreaseSpec(magic,magmin);
            fociMaxRating=magic*2;
            break;
        case "decAtt Res":
            resonance = decreaseSpec(resonance,resmin);
            break;
        case "incAtt bow weaprating": //this increase the bows rating. A strange place to put this...but whatever.
            if (weapons["bow"]["rating"]<10) {
                weapons["bow"]["rating"]++;
                bowUpdater();
            };
            break;
        case "decAtt bow weaprating": //this increase the bows rating. A strange place to put this...but whatever.
            if (weapons["bow"]["rating"]>0) {
                weapons["bow"]["rating"]--;
                bowUpdater();
            };
            break;
        
    }
    skillAttUpdater();
    
    function bowUpdater() {
        weapons["bow"]["damage"]=weapons["bow"]["rating"]+2;
        weapons["bow"]["ap"]=Math.ceil(weapons["bow"]["rating"]/4)*-1;
        weapons["bow"]["avail"]=weapons["bow"]["rating"];
        weapons["bow"]["cost"]=weapons["bow"]["rating"]*100;
    }
    
    if ($(this).closest("skilltitle")) {//if the incAtt or decAtt is in the div skilltitle, then its a skill, so update the active skills
        activeSkills=skillUpdater(activeSkills,skills);
    }
    if ($(this).closest("knowledgeskills")) {//this updates the knowledge skills
        knowledgeSkills=skillUpdater(knowledgeSkills,knowledgepoints);
    }
    
    function knowingIsHalftheBattle () {//this sets how many knowledge points a character gets
        knowledgepoints=(int+log)*2;//sets the number of knowledge skill points
    };
    
    function skillUpdater (x,y) {//this function gets called by both the active and knowledge skills
        for (skill in x) {//this will increase the skills
            if (y>0){//if you're out of skill points, don't add skills.
                if (x[skill]["rating"]<x[skill]["max"]) {//skill ratings can't be over the max skill
                    if (className=="incAtt "+[skill]) {//if increase attrabute (now poorly named) is not with a skill, then do nothing
                        if (x==activeSkills) {//if this is an active skill decrease the skill points
                            skills--;
                        } else if (x==knowledgeSkills) {//if this is a knowledge skill decrease the knowledge skill points
                            knowledgepoints--;
                        }
                        x[skill]["rating"]++;//incease the rating of the skill by 1
                    }
                }
            };
            if (x[skill]["rating"]>0) {
                if (className=="decAtt "+[skill]) {
                    if (x==activeSkills) {
                        skills++;
                    } else if (x==knowledgeSkills) {
                        knowledgepoints++;
                    }
                    x[skill]["rating"]--;
                }
            }
            else if ( (x[skill]["rating"]==0) && (x==knowledgeSkills) ) { // Removes knowledge skill if at zero and reduced again.
                if (className=="decAtt "+[skill]) {
                    $('.'+[skill]).remove(); // Technically removes table row. Does not delete array entry to avoid index problems.
                }
            }
        }
        return x;
    }
    for (skill in groupSkills) {//this will increase the skill groups
        if (skillgroups>0){
            if (groupSkills[skill]["rating"]<skillgroupmax) {
                if (className=="incAtt "+[skill]) {
                    groupSkills[skill]["rating"]++;
                    for (key in groupSkills[skill]["skillsingroup"]) {
                        var x = groupSkills[skill]["skillsingroup"][key];
                        activeSkills[x] ["rating"]=groupSkills[skill]["rating"];
                        $(".incAtt"+"."+x).addClass("deact");
                        $(".decAtt"+"."+x).addClass("deact");
                    }
                    skillgroups--;
                }
            }
        }
        if (groupSkills[skill]["rating"]>0) {
            if (className=="decAtt "+[skill]) {
                groupSkills[skill]["rating"]--;
                skillgroups++;
                for (key in groupSkills[skill]["skillsingroup"]) {
                    var x = groupSkills[skill]["skillsingroup"][key];
                    activeSkills[x] ["rating"]=groupSkills[skill]["rating"];
                    if (groupSkills[skill]["rating"]==0){
                        $(".incAtt"+"."+x).removeClass("deact");
                        $(".decAtt"+"."+x).removeClass("deact");
                    }
                }
            }
        }
    }
    
    for (prop in adeptPowers) {
        var power = adeptPowers[prop]
        if (prop=="improvedreflexes" && power["level"]>0) {//this will reduce the cost of improved reflexes if it is activated
            power["cost"]=1;
            if (power["level"]>=1 && power["level"]<3 &&powerPoints-power["cost"]>=0) {
                if (className=="incAtt "+prop) {
                    power["level"]++;
                    powerPoints=powerPoints-power["cost"];
                    iniphyDice++;
                    augrea++;
                }
            }
            if (power["level"]>1) {
                if (className=="decAtt "+[prop]) {
                    power["level"]--;
                    powerPoints=powerPoints+power["cost"];
                    iniphyDice--;
                    augrea--;
                }
            }
        } else if (prop=="improvedphysicalattributebody"||prop=="improvedphysicalattributeagility"||prop=="improvedphysicalattributereaction"||prop=="improvedphysicalattributestrength") {//if the power is improve attribute then do this stuff
            if (powerPoints-power["cost"]>=0 && power["level"]<4 && className=="incAtt "+[prop]) {
                power["level"]++;
                powerPoints=powerPoints-power["cost"];
                
                addAttMod (power["attmod"]);
            }
            if (power["level"]>1 && className=="decAtt "+prop) {
                power["level"]--;
                powerPoints=powerPoints+power["cost"];
                
                for (key in power["attmod"]) {
                    switch (power["attmod"][key]) {
                        case "body":
                            augbod=minusAugmentAtt(augbod);
                            break;
                        case "reaction":
                            augrea=minusAugmentAtt(augrea);
                            break;
                        case "agility":
                            augagi=minusAugmentAtt(augagi);
                            break;
                        case "strength":
                            augstr=minusAugmentAtt(augstr);
                            break;
                    }
                }
            }
        } else {
                if (powerPoints-power["cost"]>=0 && power["level"]<magic && className=="incAtt "+[prop]) {
                    power["level"]++;
                    powerPoints=powerPoints-power["cost"];
                    
                    for (skill in power["skillmod"]) {
                        addMod(power["skillmod"][skill], power["level"]);//updates mods that power effect
                    }
                    
                }
                if (power["level"]>1 && className=="decAtt "+[prop]) {
                    power["level"]--;
                    powerPoints=powerPoints+power["cost"];
                    for (skill in power["skillmod"]) {
                        minusMod(power["skillmod"][skill], power["level"]);//updates mods that power effect
                    }
                }
        }
    }
    
    for (item in inventory) {//this will be used to increase and decrease the weapon foci rating and license rating, and now clips too
        var itemhold = inventory[item]
        if ($(this).parents("#"+item).attr("id")==item) {
            if ($(this).attr("class")==item+" incAtt weaponfoci"&&fociRating<fociMaxRating&&focinumber<magic&&itemhold["weaponfoci"]<3&&nuyen-7000>0&&karma>0) {
                itemhold["weaponfoci"]++;
                inventoryStatUpdater (item, ".focirating.weaponfoci", itemhold["weaponfoci"]);
                fociRating++;
                nuyen-=7000;
                inventory[item]["cost"]+=7000;
                karma-=3;
            } else if ($(this).attr("class")==item+" decAtt weaponfoci"&&itemhold["weaponfoci"]>0) {
                itemhold["weaponfoci"]--;
                inventoryStatUpdater (item, ".focirating.weaponfoci", itemhold["weaponfoci"]);
                fociRating--;
                nuyen+=7000;
                itemhold["cost"]-=7000;
                karma+=3;
            }
            if ($(this).attr("class")==item+" incAtt license"&&itemhold["license"]<4&&nuyen-200>0) {
                itemhold["license"]++;
                inventoryStatUpdater (item, ".licenserating.license", itemhold["license"]);
                nuyen-=200;
                itemhold["cost"]+=200;
            } else if ($(this).attr("class")==item+" decAtt license"&&itemhold["license"]>0) {
                itemhold["license"]--;
                inventoryStatUpdater (item, ".licenserating.license", itemhold["license"]);
                nuyen+=200;
                itemhold["cost"]-=200;
            }
            if (itemhold["rating"]>0) {//if rating 0 its a crossbow.
                var arrowPrice=itemhold["rating"]*2;
                var injectPrice=itemhold["rating"]*20;
            } else {
                var arrowPrice=5;
                var injectPrice=50;
            }
            if (itemhold.name=="shuriken") {
                var arrowPrice=25;
            }
            if ($(this).attr("class")==item+" incAtt arrow"&&nuyen-arrowPrice>0) {
                itemhold["arrow"]++;
                inventoryStatUpdater (item, ".arrowNum.arrow", itemhold["arrow"]);
                nuyen-=arrowPrice;
                itemhold["cost"]+=arrowPrice;
            } else if ($(this).attr("class")==item+" decAtt arrow"&&itemhold["arrow"]>0) {
                itemhold["arrow"]--;
                inventoryStatUpdater (item, ".arrowNum.arrow", itemhold["arrow"]);
                nuyen+=arrowPrice;
                itemhold["cost"]-=arrowPrice;
            }
            if ($(this).attr("class")==item+" incAtt injarrow"&&nuyen-injectPrice>0) {
                itemhold["inject"]++;
                inventoryStatUpdater (item, ".arrowNum.injarrow", itemhold["inject"]);
                nuyen-=injectPrice;
                itemhold["cost"]+=injectPrice;
            } else if ($(this).attr("class")==item+" decAtt injarrow"&&itemhold["inject"]>0) {
                itemhold["inject"]--;
                inventoryStatUpdater (item, ".arrowNum.injarrow", itemhold["inject"]);
                nuyen+=injectPrice;
                itemhold["cost"]-=injectPrice;
            }
            
            
            if (itemhold.clip=="Clip") {
                var clipPrice=5;
            } else {
                var clipPrice=25;
            }
            if ($(this).attr("class")==item+" incAtt extraclips"&&nuyen-clipPrice>0) {
                itemhold["extraclips"]++;
                inventoryStatUpdater (item, ".numofclips.extraclips", itemhold["extraclips"]);
                nuyen-=clipPrice;
                itemhold["cost"]+=clipPrice;
            } else if ($(this).attr("class")==item+" decAtt extraclips"&&itemhold["extraclips"]>0) {
                itemhold["extraclips"]--;
                inventoryStatUpdater (item, ".numofclips.extraclips", itemhold["extraclips"]);
                nuyen+=clipPrice;
                itemhold["cost"]-=clipPrice;
            }
            
        }
    };
    
    function inventoryStatUpdater(x,y,z) {//x=the name of the item, y=the classes to target the table to update the stat. z=the stat to show
        $("#"+x+" "+y).empty().append(z);
    }
    
    function increasePhy(x, y) {//this shit increases an attrabute while decreating the points you can spend
        if (phyAttMax==true) {
            y--;
        }
        if (attribute>0&&x<y) {
                x++;
                attribute--;
                if (x==y) {
                    phyAttMax=true;
                }
            }
        return x;
    }
    function increaseMen(x, y) {//this shit increases an attrabute while decreating the points you can spend
        if (phyAttMax==true) {
            y--;
        }
        if (attribute>0&&x<y) {
                x++;
                attribute--;
                if (x==y) {
                    phyAttMax=true;//if i ever need to change this back to mental attrubuteing being difference the variable is menAttMax
                }
            }
        return x;
    }
    
    function decreasePhy(x, y, z) {//this shit decreases and attrabute while increating the points you can spend
        if (x==z) {
                phyAttMax=false;
            }
        if (x>y) {x--;
            attribute++;}
        return x;
    }
    function decreaseMen(x, y, z) {//this shit decreases and attrabute while increating the points you can spend
        if (x==z) {
                phyAttMax=false;
            }
        if (x>y) {x--;
            attribute++;}
        return x;
    }
    
    function increaseSpec (x,y) {//this is for special attrabutes, they get their own funcation because they're special
        if (specAttribute>0) {
            if (x<y) {x++;
            specAttribute--;}
        }
        return x;
    }
    function decreaseSpec(x, y) {//for when special people make a mistake
        if (x>y) {x--;
            specAttribute++;}
        return x;
    }
    attDisplay ();//this was ment to orignally update the attrabutes, but is now used for EVERYTHING
}

function addAugmentAtt(x) {
    if (x<4) {
        x++;
    }
    return x;
}

function minusAugmentAtt(x) {
    if (x>0) {
        x--;
    }
    return x;
}
$(".mage, .techno, .mystic, .adept, .aspect").click(//this part will call the magic/resonance function
    selectmagres
);

function selectmagres() { //Magic/Resonance controls
    if ($(this).hasClass('deact')||$(this).hasClass('selected')) {//this will make it so that if the button is deactivated that it won't do anything
        return;
    }
    else {
        fnselect ($(this));//highlights what's been clicked on
        
        if ( $(this).hasClass('mage') ) {//magic man doing magic stuff
            magres="mage";
            awaken ("Mag","Res");
            magemysticsetting ();
        }
        if ( $(this).hasClass('mystic') ) {//mystic adept stuff
            magres="mystic";
            awaken ("Mag","Res");
            magemysticsetting ();
        }
        if ( $(this).hasClass('techno') ) {//technomancer stuff
            magres="technomancer";
            awaken ("Res","Mag");
            switch ("magres"){
                case priorityA:
                    magic=0;
                    powerPoints=0;
                    resonance=6;
                    resmin=6;
                    skills=skills+10;
                    forms=5;
                    spells=0;
                    break;
                case priorityB:
                    magic=0;
                    powerPoints=0;
                    resonance=4;
                    resmin=4;
                    skills=skills+8;
                    forms=2;
                    spells=0;
                    break;
                case priorityC:
                    magic=0;
                    powerPoints=0;
                    resonance=3;
                    resmin=3;
                    forms=1;
                    spells=0;
                    break;
            }
        }
        if ( $(this).hasClass('adept') ) {//adept kung fu stuff
            magres="adept";
            awaken ("Mag","Res");
            switch ("magres"){
                case priorityB:
                    magic=6;
                    powerPoints=6.0;
                    magmin=6;
                    resonance=0;
                    skills=skills+4;
                    spells=0;
                    forms=0;
                    break;
                case priorityC:
                    magic=4;
                    powerPoints=4.0;
                    magmin=4;
                    resonance=0;
                    skills=skills+2;
                    spells=0;
                    forms=0;
                    break;
                case priorityD:
                    magic=2;
                    powerPoints=2.0;
                    magmin=2;
                    resonance=0;
                    spells=0;
                    forms=0;
                    break;
            }
        }
        if ( $(this).hasClass('aspect') ) {//aspect mage stuff
            magres="aspect";
            awaken ("Mag","Res");
            switch ("magres"){
                case priorityB:
                    magic=5;
                    powerPoints=0;
                    magmin=5;
                    resonance=0;
                    skillgroups=skillgroups+4;
                    spells=0;
                    forms=0;
                    break;
                case priorityC:
                    magic=3;
                    powerPoints=0;
                    magmin=3;
                    resonance=0;
                    skillgroups=skillgroups+2;
                    spells=0;
                    forms=0;
                    break;
                case priorityD:
                    magic=2;
                    powerPoints=0;
                    magmin=2;
                    resonance=0;
                    spells=0;
                    forms=0;
                    break;
            }
        }
        
        fociMaxRating=magic*2;
        
    }
    attDisplay ();
}
function magemysticsetting () {//since mystics and mages have the same stuff, they get a funcation
    switch ("magres"){
        case priorityA:
            magic=6;
            powerPoints=0;
            magmin=6;
            resonance=0;
            skills=skills+10;
            spells=10;
            forms=0;
            break;
        case priorityB:
            magic=4;
            powerPoints=0;
            magmin=4;
            resonance=0;
            skills=skills+8;
            spells=7;
            forms=0;
            break;
        case priorityC:
            magic=3;
            powerPoints=0;
            magmin=3;
            resonance=0;
            spells=5;
            forms=0;
            break;
    }
}
function awaken(x,y) {//this is suppose to unhide magic or resonance and then hide the other stat
    $("."+x).removeClass("hide");
    $("."+y).addClass("hide");
}
//Skills to pay the bills


function setUpSkills () {//Well, this is used for more then just skills now. It should only run once at start up
    theLabeler (".skilllabel",".skills");//I messed up when I made the render loop for the skills. I didn't label them. This fixes that.
    theLabeler ("#adeptlabel","#powerlist");
    theLabeler (".label.combat",".spells.combat");
    theLabeler (".label.detection",".spells.detection");
    theLabeler (".label.health",".spells.health");
    theLabeler (".label.illusion",".spells.illusion");
    theLabeler (".label.manipulation",".spells.manipulation");
    theLabeler (".label.complexforms",".complexforms.library");
    theLabeler (".label.bow",".projectiles.bow");
    theLabeler (".label.crossbow",".projectiles.crossbow");
    theLabeler (".label.throwingweapon",".projectiles.throwingweapons");
    theLabeler (".label.firearm",".firearms");
    
    function theLabeler(x,y) {
        $(x).appendTo(y);
    }
    $(".knowledgename").appendTo(".namingStuffIsHard");
    upNAtEm (activeSkills);
    upNAtEm (knowledgeSkills);
    
    function upNAtEm (x) {//function to set up the active and knowledge skills, "Up and at 'em, Atom Ant!"
        for(skill in x) {
            skillsum = funSkillSum (x[skill]["defaultable"], x[skill]["rating"], x[skill]["mod"], x[skill]["stat"]);
            
            $("<tr class='"+[skill]+"'><td class='incAtt "+[skill]+"'>+</td><td class='rating'>"+x[skill]["rating"]+"</td><td class='decAtt "+[skill]+"'>-</td><td class='skillName'>"+x[skill]["name"]+"</td><td class='stat'>"+x[skill]["stat"]+"</td><td class= 'mod'>"+x[skill]["mod"]+"</td><td class='skillsum'>"+skillsum+"</td><tr>")
              .appendTo("."+x[skill]["catalog"]);
        }
    }

    for(skill in groupSkills) {//this for loop sets up the skill groups
        $("#skillgrouplist").find("tbody").append($("<tr class='"+[skill]+"'><td class='incAtt "+[skill]+"'>+</td><td class='"+[skill]+" rating'>"+groupSkills[skill]["rating"]+"</td><td class='decAtt "+[skill]+"'>-</td><td class='skillgroupname'>"+groupSkills[skill]["name"]+"</td><td class='skillsin "+[skill]+"'></td></tr>"));
        for(key in groupSkills[skill]["skillsingroup"]) {
            $(".skillsin"+"."+[skill]).append(activeSkills[groupSkills[skill]["skillsingroup"][key]]["name"]+", ");
            
        }
    }
    
    for(power in adeptPowers) {//this for loop sets up the adept powers
        $("#powerlist").append($("<tr class='"+[power]+"'><td id='"+[power]+"'class='add "+[power]+" button'><strong>-</strong></td><td class='incAtt "+[power]+" deact'>+</td><td class='level "+[power]+"'>"+adeptPowers[power]["level"]+"</td><td class='decAtt "+[power]+" deact'>-</td><td class='name "+[power]+"'>"+adeptPowers[power]["name"]+"</td><td class='cost "+[power]+"'>"+adeptPowers[power]["cost"]+"</td><td class='activation "+[power]+"'>"+adeptPowers[power]["activation"]+"</td><td class='drain "+[power]+"'>n/a</td></tr>"));
        
        if (adeptPowers[power]["drain"]==true) {
            $(".drain."+[power]).empty().append($(adeptPowers[power]["level"]));
        }
    }
    
    for (spell in spellforms) {//this sets up the spells
        var spellhold=spellforms[spell];
        if (spellforms[spell]["category"]=="combat") {
            $(".spells.combat").append($("<tr id='"+spell+"' class='"+spellhold["category"]+"'><td class='spellact "+spell+" button'><strong>-</strong></td><td class='prepact "+spell+" button'><strong>-</strong></td><td class='spellname "+spell+"'>"+spellhold["name"]+"</td><td class='direct "+spell+"'></td><td class='element "+spell+"'>"+spellhold["element"]+"</td><td class='spelltype "+spell+"'>"+spellhold["type"]+"</td><td class='spellrange "+spell+"'>"+spellhold["range"]+"</td><td class='spelldam "+spell+"'>"+spellhold["damage"]+"</td><td class='spelldur "+spell+"'>"+spellhold["duration"]+"</td><td class='drain "+spell+"'>"+spellhold["drain"].toString()+"</td></tr>"));
            if (spellhold["direct"]==true) {
                $("<span>Direct</span>").appendTo($(".direct."+spell));
            } else {
                $("<span>Indirect</span>").appendTo($(".direct."+spell));
            }
        }
        
        if (spellforms[spell]["category"]=="detection") {
            $(".spells.detection").append($("<tr id='"+spell+"' class='"+spellhold["category"]+"'><td class='spellact "+spell+" button'><strong>-</strong></td><td class='prepact "+spell+" button'><strong>-</strong></td><td class='spellname "+spell+"'>"+spellhold["name"]+"</td><td class='illact "+spell+"'>"+spellhold["active"]+"</td><td class='direction "+spell+"'>"+spellhold["direction"]+"</td><td class='spelltype "+spell+"'>"+spellhold["type"]+"</td><td class='spellrange "+spell+"'>"+spellhold["range"]+"</td><td class='spelldur "+spell+"'>"+spellhold["duration"]+"</td><td class='drain "+spell+"'>"+spellhold["drain"].toString()+"</td></tr>"));
        }
        
        if (spellforms[spell]["category"]=="health") {
            $(".spells.health").append($("<tr id='"+spell+"' class='"+spellhold["category"]+"'><td class='spellact "+spell+" button'><strong>-</strong></td><td class='prepact "+spell+" button'><strong>-</strong></td><td class='spellname "+spell+"'>"+spellhold["name"]+"</td><td class='heaEss "+spell+"'></td><td class='spelltype "+spell+"'>"+spellhold["type"]+"</td><td class='spellrange "+spell+"'>"+spellhold["range"]+"</td><td class='spelldur "+spell+"'>"+spellhold["duration"]+"</td><td class='drain "+spell+"'>"+spellhold["drain"].toString()+"</td></tr>"));
            if (spellhold["essence"]==true) {
                $(".heaEss."+spell).append($("<span>Essence</span>"));
            } else {
                $(".heaEss."+spell).append($("<span>n/a</span>"));
            }
        }
        
        if (spellforms[spell]["category"]=="illusion") {
            $(".spells.illusion").append($("<tr id='"+spell+"' class='"+spellhold["category"]+"'><td class='spellact "+spell+" button'><strong>-</strong></td><td class='prepact "+spell+" button'><strong>-</strong></td><td class='spellname "+spell+"'>"+spellhold["name"]+"</td><td class='realistic "+spell+"'></td><td class='sense "+spell+"'>"+spellhold["sense"]+"</td><td class='spelltype "+spell+"'>"+spellhold["type"]+"</td><td class='spellrange "+spell+"'>"+spellhold["range"]+"</td><td class='spelldur "+spell+"'>"+spellhold["duration"]+"</td><td class='drain "+spell+"'>"+spellhold["drain"].toString()+"</td></tr>"));
            if (spellhold["realistic"]==true) {
                $(".realistic."+spell).append($("<span>Realistic</span>"))
            } else {
                $(".realistic."+spell).append($("<span>Obvious</span>"))
            }
        }
        
        if (spellforms[spell]["category"]=="manipulation") {
            $(".spells.manipulation").append($("<tr id='"+spell+"' class='"+spellhold["category"]+"'><td class='spellact "+spell+" button'><strong>-</strong></td><td class='prepact "+spell+" button'><strong>-</strong></td><td class='spellname "+spell+"'>"+spellhold["name"]+"</td><td class='effect "+spell+"'>"+spellhold["effect"]+"</td><td class='damage "+spell+"'>"+spellhold["damage"]+"</td><td class='spelltype "+spell+"'>"+spellhold["type"]+"</td><td class='spellrange "+spell+"'>"+spellhold["range"]+"</td><td class='spelldur "+spell+"'>"+spellhold["duration"]+"</td><td class='drain "+spell+"'>"+spellhold["drain"].toString()+"</td></tr>"));
        }
    }
    spellinput (" ","detectlifeform", "Life Form");
    spellinput (" Extended","detectlifeformextended", "Life Form");
    spellinput (" ","detectobject", "Object");
    
    function spellinput(x,y,z) {//so people can input their own detection spells
        $(".spellname."+y).empty().append($("<span>Detect "+ "<input type='text' class='"+y+"' placeholder='"+z+"'>"+x+"</span>"));
    }
    
    spellattselect ("decreaseattribute", "Decrease ");
    spellattselect ("increaseattribute", "Increase ");
    
    function spellattselect (x, y) {//so people can select which attabute is used for the increase/decrease spells
        $(".spellname."+x).empty().append($("<span>"+y+"<select class="+x+"><option value=''>[Attribute]</option><option value='Body'>Body</option><option value='Agility'>Agility</option><option value='Reaction'>Reaction</option><option value='Strength'>Strength</option><option value='Will'>Will</option><option value='Logic'>Logic</option><option value='Intuition'>Intuition</option><option value='Charisma'>Charisma</option></select>"+"</span>"))
    }
    
    for (form in complexforms) {
        var formhold = complexforms[form];
        $(".complexforms.library").append($("<tr id='"+form+"'class='form'><td class='formact "+form+" button'><strong>-</strong></td><td class='formname "+form+"'>"+formhold["name"]+"</td><td class='formtarget "+form+"'>"+formhold["target"]+"</td><td class='formdur "+form+"'>"+formhold["duration"]+"</td><td class='fading "+form+"'>"+formhold["fading"]+"</td></tr>"));
    }
    
    $(".melee.label").appendTo($(".meleeweapon"));//this labels the melee weapons, but I have a function that does this, so i'm stupid for not using that function
    
    for (item in weapons) {//this pulls the weapons stats from the weapons object to populate the page
        var itemhold = weapons[item];
        //this one populates the melee weapons
        $("<tr id='"+item+"'><td class='weapact "+item+" button'><strong>+</strong></td><td class='weapname "+item+"'>"+itemhold["name"]+"</td><td class='accuracy "+item+"'>"+itemhold["accuracy"]+"("+(itemhold["accuracy"]+itemhold["accmod"])+")"+"</td><td class='reach "+item+"'>"+itemhold["reach"]+"("+(itemhold["reach"]+reachmod)+")"+"</td><td class='damage "+item+"'>"+(itemhold["stat"]+itemhold["damage"])+"("+(itemhold["stat"]+itemhold["damage"]+itemhold["dvmod"])+")"+itemhold["damtype"]+" "+itemhold["element"]+"</td><td class='ap "+item+"'>"+itemhold["ap"]+"</td><td class='avail "+item+"'>"+itemhold["avail"]+" "+itemhold["restrict"]+"</td><td class='cost "+item+"'>"+itemhold["cost"]+"&#65509"+"</td></tr>").appendTo($(".meleeweapon."+itemhold["category"]));
        //this one populates the projectiles
        $("<tr id='"+item+"'><td class='weapact "+item+" button'><strong>+</strong></td><td class='incAtt "+item+" weaprating'>+</td><td class='weaprating "+item+" weapratingnum'>"+itemhold["rating"]+"</td><td class='decAtt "+item+" weaprating'>-</td><td class='weap accuracy "+item+"'>"+itemhold["arruracy"]+"</td><td class='weap damage "+item+"'>"+itemhold["damage"]+"</td><td class='weap ap "+item+"'>"+itemhold["ap"]+"</td><td class='weap avail "+item+"'>"+itemhold["avail"]+"</td><td class='weap cost "+item+"'>"+itemhold["cost"]+"</td></tr>").appendTo(".projectiles."+itemhold["category"]);
        //firearms
        $("<tr id='"+item+"'><td class='weapact "+item+" button'><strong>+</strong></td><td class='weapname "+item+"'>"+itemhold["name"]+"</td><td class='accuracy "+item+"'>"+itemhold["accuracy"]+"("+(itemhold["accuracy"]+itemhold["accmod"])+")"+"</td><td class='damage "+item+"'>"+itemhold["damage"]+"("+(itemhold["damage"]+itemhold["dvmod"])+")"+itemhold["damtype"]+" "+itemhold["element"]+"</td><td class='ap "+item+"'>"+itemhold["ap"]+"</td><td class='modes "+item+"'></td><td class='RC "+item+"'>"+itemhold["rc"]+"</td><td class='ammo "+item+" clip'>"+itemhold["ammo"]+" "+itemhold["clip"]+"</td><td class='avail "+item+"'>"+itemhold["avail"]+" "+itemhold["restrict"]+"</td><td class='cost "+item+"'>"+itemhold["cost"]+"&#65509"+"</td></tr>").appendTo(".firearms."+itemhold["category"]);
        
        for (firemode in itemhold["mode"]) {
            $(".modes."+item).append(itemhold["mode"][firemode]+",<br/>");
        }
        for (diffAmmo in itemhold["altammo"]) {
            switch (diffAmmo) {
                case "ammo":
                    $("."+diffAmmo+"."+item).append("/"+itemhold["altammo"][diffAmmo]);
                    break;
                case "clip":
                    $("."+diffAmmo+"."+item).append(" "+itemhold["altammo"][diffAmmo]);
                    break;
            }
        }
        if (itemhold["avail"]>12) {
            $(".weapact."+item).addClass("deact").empty().append("<span>-</span>");
        }
    }
    $(".projectiles.crossbow,#shuriken").find(".weaprating").remove();//this removes the rating information for the crossbows, because crossbows don't have ratings
}

function funSkillSum (w, x, y, z) {//used to calculate the dice pool of a skill
    if (w==true && x==0) {
        sum = y+z+x-1;
    } else if (w==false && x==0) {
        sum="n/a";
    } else {
        sum = y+z+x;
    }
    return sum;
}

function skillAttUpdater() {
    for(prop in activeSkills) {
        switch (activeSkills[prop]["catalog"]) {//this updates the skills attrabute with the current attrabute rating
            case "agility":
                activeSkills[prop]["stat"]=agi+augagi;
                break;
            case "body":
                activeSkills[prop]["stat"]=bod+augbod;
                break;
            case "reaction":
                activeSkills[prop]["stat"]=rea+augrea;
                break;
            case "strength":
                activeSkills[prop]["stat"]=str+augstr;
                break;
            case "charisma":
                activeSkills[prop]["stat"]=cha+augcha;
                break;
            case "intuition":
                activeSkills[prop]["stat"]=int+augint;
                break;
            case "logic":
                activeSkills[prop]["stat"]=log+auglog;
                break;
            case "will":
                activeSkills[prop]["stat"]=wil+augwil;
                break;
            case "magic":
                activeSkills[prop]["stat"]=magic;
                break;
            case "resonance":
                activeSkills[prop]["stat"]=resonance;
                break;
        }
    }
}

function renderSkills () {//this has become for rendering/updating anything that can be accessed with a for loop; it seems.
    for(prop in activeSkills) {
        statUpdater ("stat", [prop],activeSkills);
        statUpdater ("rating", [prop],activeSkills);
        statUpdater ("mod", [prop],activeSkills);
        activeSkills[prop]["skillsum"] = funSkillSum (activeSkills[prop]["defaultable"], activeSkills[prop]["rating"], activeSkills[prop]["mod"], activeSkills[prop]["stat"]);
        dicePoolUpdater (activeSkills[prop]["skillsum"], [prop]);
    }
    for(prop in knowledgeSkills) {
        switch (knowledgeSkills[prop]["catalog"]) {//knowledge skill shit is here
            case "academic":
                knowledgeSkills[prop]["stat"]=log;
                break;
            case "interests":
                knowledgeSkills[prop]["stat"]=int;
                break;
            case "professional":
                knowledgeSkills[prop]["stat"]=log;
                break;
            case "street":
                knowledgeSkills[prop]["stat"]=int;
                break;
            case "language":
                knowledgeSkills[prop]["stat"]=int;
                break;
        }
        
        statUpdater ("stat", [prop],knowledgeSkills);
        statUpdater ("rating", [prop],knowledgeSkills);
        statUpdater ("mod", [prop],knowledgeSkills);
        skillsum = funSkillSum (knowledgeSkills[prop]["defaultable"], knowledgeSkills[prop]["rating"], knowledgeSkills[prop]["mod"], knowledgeSkills[prop]["stat"]);
        dicePoolUpdater (skillsum, [prop]);
    }
    
    for (prop in adeptPowers) {//rendering and updating adept powers!
        statUpdater ("level", prop, adeptPowers);
        if (adeptPowers[prop]["drain"]==true) {
            $("."+prop+" .drain").empty().append("<span>"+adeptPowers[prop]["level"]+"</span>");
        }
    }
    
    function statUpdater (x, y, z) {
        $("."+y+" ."+x).empty().append("<span>"+z[y][x]+"</span>");
    }
    
    function dicePoolUpdater (x,y) {
        $("."+y+" .skillsum").empty().append("<span>"+x+"</span>");
    }
    
    for (skill in groupSkills) {
        $("."+[skill]+" ."+"rating").empty().append("<span>"+groupSkills[skill]["rating"]+"</span>");
    }
    
    for (item in weapons) {
        if (weapons[item]["stat"]>0) {
            weapons[item]["stat"]=str+augstr;
        }
        if (weapons[item]["skill"]=="unarmedcombat"||weapons[item]["skill"]=="throwingweapons") {
            weapons[item]["accuracy"]=phyLimit+phyLimitMod;
        }
        augmentedStat("accmod", "accuracy", [item], weapons)
        $(".reach."+item).empty().append("<span>"+weapons[item]["reach"]+"("+(weapons[item]["reach"]+reachmod)+")"+"</span>");
        $(".weaprating."+item+".weapratingnum").empty().append(weapons[item]["rating"]);
        $(".ap."+item).empty().append(weapons[item]["ap"]);//render weapon ap
        $(".avail."+item).empty().append(weapons[item]["avail"]+" "+weapons[item]["restrict"]);
        $(".cost."+item).empty().append("<span>"+weapons[item]["cost"]+"&#65509</span>");
        augmentedDam("damtype","element","stat", "damage", [item], weapons);//render weapon damage this also changes the ap for weapons with altammo
    }
    
    for (itemNum in inventory) {//this is suppose to update the nuyen price of the time
        
        if (typeof inventory[itemNum]["skill"]==='undefined') {
            
        } else if (inventory[itemNum]["weaponfoci"]>0&&activeSkills[inventory[itemNum]["skill"]]["skillsum"]!="n/a") {//this if statements sets the dice pool for the item
            var dp = activeSkills[inventory[itemNum]["skill"]]["skillsum"]+inventory[itemNum]["weaponfoci"];
        }else if (inventory[itemNum]["rating"]>str) {//this is for bows
            var dp = activeSkills[inventory[itemNum]["skill"]]["skillsum"]-((inventory[itemNum]["rating"]-str)*3);
        } else {//this is for everything else
            var dp = activeSkills[inventory[itemNum]["skill"]]["skillsum"];
        }
        $("#"+itemNum+" .weaponDP").empty().append("<span>"+(dp)+"</span>");//this renders the dice pool
        $("#"+itemNum+" .custWeapPrice").empty().append("<span>"+inventory[itemNum]["cost"]+"&#65509</span>");//this renders the cost
        $("#"+itemNum+" .acc").empty().append(inventory[itemNum]["accuracy"]+"("+(inventory[itemNum]["accuracy"]+inventory[itemNum]["accmod"])+")");//this renders accuacy of a gun
        $("#"+itemNum+" .rc").empty().append(inventory[itemNum]["rc"]+Math.ceil((str/3)+1)+"("+(inventory[itemNum]["rc"]+inventory[itemNum]["rcmod"]+Math.ceil((str/3)+1))+")");//this renders the recoil comp
        $("#"+itemNum+" .avail").empty().append(inventory[itemNum]["avail"]+" "+inventory[itemNum]["restrict"]);//this renders the avail of a gun
    }
    
    function augmentedStat(w,x,y,z) {//w-stat modefiers, x=class and key of the stat, y=name of the item and key of the item, z=the object to have the keys work on
        $("."+y+"."+x).empty().append("<span>"+z[y][x]+"("+(z[y][x]+z[y][w])+")"+"</span>");
    }
    
    function augmentedDam(u,v,w,x,y,z) {//u=damtype, v=element, w=stat, x=damage, y=[item], z=weapon
        switch ('undefined') {//I'm so happy this works! Its a switch statement that looks to see if something exists
            case typeof z[y]["altammo"]:
                damnDamage(u,v,w,x,y,z);
                break;
            case typeof z[y]["altammo"][x]://if altammo.damage doesn't exist, render ammo like normal!
                damnDamage(u,v,w,x,y,z);
                break;
            case typeof z[y]["altammo"][v]:
                $("."+y+"."+x).empty().append("<span>"+(z[y][x]+z[y][w])+"("+(z[y][x]+z[y][w]+z[y]["dvmod"])+")"+z[y][u]+" "+z[y][v]+"/ "+(z[y]["altammo"][x]+z[y][w])+"("+(z[y]["altammo"][x]+z[y][w]+z[y]["dvmod"])+")"+z[y][u]+"</span>");
                damnAP(y);
                break;
            default:
                $("."+y+"."+x).empty().append("<span>"+(z[y][x]+z[y][w])+"("+(z[y][x]+z[y][w]+z[y]["dvmod"])+")"+z[y][u]+" "+z[y][v]+"/ "+(z[y]["altammo"][x]+z[y][w])+"("+(z[y]["altammo"][x]+z[y][w]+z[y]["dvmod"])+")"+z[y][u]+" "+z[y]["altammo"][v]+"</span>");
                damnAP(y);
                break;
        }
    }
    
    function damnAP(y) {
        $(".ap."+y).append("/"+weapons[y]["altammo"]["ap"]);//render weapon altammo ap
    }
    
    function damnDamage(u,v,w,x,y,z) {//as if this shit wasn't stupidly complex enough.
        $("."+y+"."+x).empty().append("<span>"+(z[y][x]+z[y][w])+"("+(z[y][x]+z[y][w]+z[y]["dvmod"])+")"+z[y][u]+" "+z[y][v]+"</span>");
    }
};

$(document).ready(function () {//this is makes it so that that skill points becomes fixed to the window
var top = $("#skillPoints").offset().top - parseFloat($('#skillPoints').css('margin-top'));//this stupid variable doesn't get set right unless I put it in the document ready funcation
$(window).scroll(function(){
    var y = $(window).scrollTop();
    if (y>=top){
        $("#skillPoints").addClass("fixed");
    } else {
        $("#skillPoints").removeClass("fixed");
    }
});
})

$(".knowButton").click(//used to select which type of knowledge skill is being sent
    knowledgeTypeSelect
)

function knowledgeTypeSelect () {
    fnselect($(this));
    knowledgeType = $(this).attr("id");
}

$("#addSkill").click(
    addKnowing
)

function addKnowing () {
    knowledgeSkills.push({name:$(".knowledgeName").val(), catalog: knowledgeType, stat:"INT", rating:0, mod:0, max:6, defaultable:false});
    
    skill = knowledgeSkills.length-1;
            skillsum = funSkillSum (knowledgeSkills[skill]["defaultable"], knowledgeSkills[skill]["rating"], knowledgeSkills[skill]["mod"], knowledgeSkills[skill]["stat"]);
            
            $("<tr class='"+[skill]+"'><td class='incAtt "+[skill]+"'>+</td><td class='rating'>"+knowledgeSkills[skill]["rating"]+"</td><td class='decAtt "+[skill]+"'>-</td><td class='skillName'>"+knowledgeSkills[skill]["name"]+"</td><td class='stat'>"+knowledgeSkills[skill]["stat"]+"</td><td class= 'mod'>"+knowledgeSkills[skill]["mod"]+"</td><td class='skillsum'>"+skillsum+"</td><tr>")
              .appendTo("."+knowledgeSkills[skill]["catalog"]);
        
}

$(".add").click(
    addPowerPoint
)

function addPowerPoint () {//this activates adept powers
    var power=adeptPowers[$(this).attr("id")];//this is just short hand to say adeptPowers["power name"]
    
    if($(this).hasClass("active")){//if the power is already on, then
        deactivate($(this));//remove the class that says its on
        power["active"]=false;//turn off power
        //I still need to figure out how to reduce the skill mod when we turn off the skill
        for (skill in power["skillmod"]) {
            resetMod(power["skillmod"][skill],power["level"]);
        }
        for (key in power["attmod"]) {//this rests the augmented attibute...for the most part.
            switch (power["attmod"][key]) {
                case "body":
                    augbod-=power["level"];
                    break;
                case "reaction":
                    augrea-=power["level"];
                    break;
                case "agility":
                    augagi-=power["level"];
                    break;
                case "strength":
                    augstr-=power["level"];
                    break;
            }
        }
        if ($(this).attr("id")=="improvedreflexes") {//god damn improvereflexes has to be a special snowflake and follow different rules
            power["cost"]=1.5;
            iniphyDice=1;
            switch (power["level"]) {
                case 1:
                    powerPoints+=1.5;
                    augrea-=1;
                    break;
                case 2:
                    powerPoints+=2.5;
                    augrea-=2;
                    break;
                case 3:
                    powerPoints+=3.5;
                    augrea-=3;
                    break;
            }
        }else if (power["level"] != "n/a") {//this is for every power that is not improve reflexes
            
            powerPoints=powerPoints+(power["cost"]*power["level"]);//basically, it recovers the ammount of power points that was spend on the power of turned off
        } else {
            powerPoints+=power["cost"];
        }
        if (power["level"] != "n/a") {//if the power level is NOT n/a then do this stuff here
            power["level"]=0;
            $(".incAtt"+"."+$(this).attr("id")).addClass("deact");
            $(".decAtt"+"."+$(this).attr("id")).addClass("deact");
        }
        minusLimitMod (power["limitmod"]);//for the 3 powers that increase limits, this will reduce the limits they effect
    } else {//This is for when the power is already off, it turns it on, amoung other things
        if (powerPoints-power["cost"]>=0) {//if the cost of the power takes the powerpoints below 0, then do nothing
            activate($(this));
            power["active"]=true;//turn on
            if (power["level"] != "n/a") {//if the power is turned on, then add a level and remove the decative class on the + and - buttons
                power["level"]++;
                $(".incAtt"+"."+$(this).attr("id")).removeClass("deact");
                $(".decAtt"+"."+$(this).attr("id")).removeClass("deact");
                for (skill in power["skillmod"]) {
                    addMod(power["skillmod"][skill],power["level"]);
                }
                addAttMod (power["attmod"]);
                
                if ($(this).attr("id")=="improvedreflexes") {
                    augrea++;
                    iniphyDice++;
                }
            }
            addLimitMod (power["limitmod"]);//this will increase limits
            powerPoints=powerPoints-power["cost"]
        }
    }
    
    attDisplay();
}

function addLimitMod(x) {
    for (key in x) {
        switch (x[key]) {
            case "physical":
                phyLimitMod++;
                break;
            case "mental":
                menLimitMod++;
                break;
            case "social":
                socLimitMod++;
                break;
            
        }
    }
}
function minusLimitMod(x) {
    for (key in x) {
        switch (x[key]) {
            case "physical":
                phyLimitMod--;
                break;
            case "mental":
                menLimitMod--;
                break;
            case "social":
                socLimitMod--;
                break;
            
        }
    }
}

function addAttMod(x) {//this will increase the augmented attribute
    for (key in x) {
        switch (x[key]) {
            case "body":
                augbod=addAugmentAtt(augbod);
                break;
            case "reaction":
                augrea=addAugmentAtt(augrea);
                break;
            case "agility":
                augagi=addAugmentAtt(augagi);
                break;
            case "strength":
                augstr=addAugmentAtt(augstr);
                break;
        }
    };
}


function addMod(x, y) {//x=skill name y=adept power level
    if (y<=magic) {
        activeSkills[x]["mod"]++;
    }
}

function minusMod(x, y) {
    if (y>=0) {
        activeSkills[x]["mod"]--;
    }
}

function resetMod(x,y) {
    activeSkills[x]["mod"]-=y
}

$().click(//this will make a spell as either being a spell or a alchemy preparation
    spellActivate
)

$("#spelllist").on("click",".spellact, .prepact",//When ever #spelllist is updated, it we check the spellact and prepact to do the spellactivate function
    spellActivate
);

function spellActivate() {//this is used to turn of add spells and alchemical preparations
    var spell=spellforms[$(this).parent().attr("id")];
    
    switch (spell["name"]) {//switch to find the 3 custom detection spells
        case "Detect [Life Form]":
            customDetectSpell($("input.detectlifeform").val(), " ", "detectlifeform");
            break;
        case "Detect [Life Form], Extended":
            customDetectSpell($("input.detectlifeformextended").val(), "extended", "detectlifeformextended");
            break;
        case "Detect [Object]":
            customDetectSpell($("input.detectobject").val(), " ", "detectobject");
            break;
        case "Decrease [Attribute]":
            customAttributeSpell($("select.decreaseattribute").val(), "decreaseattribute", "Decrease ");
            break;
        case "Increase [Attribute]":
            customAttributeSpell($("select.increaseattribute").val(), "increaseattribute", "Increase ");
            break;
        default://if the spell isn't one of those three, then do this
            if($(this).hasClass("active")){//if the spell has already been activated, then do this
                deactivate($(this));//remove the active class, and change the + to a -
                if ($(this).hasClass("spellact")) {//is this a spell? then turn it off
                    spell["spell"]=false;
                } else {//Well, if its not a spell, then its a preporation, and then turn that off
                    spell["preporation"]=false;
                }
                spells++;//return spell points to buy more spells
            } else {//If the spell isn't on, then its off, so do this stuff
                if (spells>0) {//do you have spell points to buy more spells?
                    activate($(this));//Then add the active class and replace the - with a +
                    if ($(this).hasClass("spellact")) {//was it the spell you clicked? then turn it on
                        spell["spell"]=true;
                    } else {//if its not a spell, then its a preporation
                        spell["preporation"]=true;
                    }
                    spells--;//reduce spell points
                }
            }
            break;
    };
    attDisplay();//update the renderer, which will update the spell points to the new total
    
    function customDetectSpell(x,y,z) {//this function is for custom detection spells, in case the name wasn't a dead give away
        if (x==""||typeof spellforms["detect"+x+y]!='undefined') {//Did the user forget to input data or already enter this data? Then do NOTHING!
            console.log("Stop clicking that!");
            return;
        }
        spellforms["detect"+x+y] = { name:"Detect "+x+" "+y, category: "detection", spell: false, preparation: false, active: "active", direction: spellforms[z]["direction"], type: spellforms[z]["type"], range: "T", duration: "Sustain", drain: spellforms[z]["drain"] };//sets all the values for the new spellform object
        spellhold = spellforms["detect"+x+y]//short hand, because typing all that junk was annoying
        var spell="detect"+x+y;
        $("#"+z).after($("<tr id='"+spell+"' class='"+spellhold["category"]+"'><td class='spellact "+spell+" button'><strong>-</strong></td><td class='prepact "+spell+" button'><strong>-</strong></td><td class='spellname "+spell+"'>"+spellhold["name"]+"</td><td class='illact "+spell+"'>"+spellhold["active"]+"</td><td class='direction "+spell+"'>"+spellhold["direction"]+"</td><td class='spelltype "+spell+"'>"+spellhold["type"]+"</td><td class='spellrange "+spell+"'>"+spellhold["range"]+"</td><td class='spelldur "+spell+"'>"+spellhold["duration"]+"</td><td class='drain "+spell+"'>"+spellhold["drain"].toString()+"</td></tr>"));//Add the spell to the list on the DOM after where it was entered
    }
    
    function customAttributeSpell(x,y,z) {
        if (x==""||typeof spellforms[z+x]!='undefined') {//Did the user forget to input data or already enter this data? Then do NOTHING!
            console.log("You can't "+z+"that!");
            return;
        }
        spellforms[z+x] = { name:z+" "+x, category: "health", spell: false, preparation: false, essence: "Essence", type: spellforms[y]["type"], range: "T", duration: "Sustain", drain: spellforms[y]["drain"] };//sets all the values for the new spellform object
        spellhold = spellforms[z+x]//short hand, because typing all that junk was annoying
        var spell=y;
        $("#"+y).after($("<tr id='"+z+x+"' class='"+spellhold["category"]+"'><td class='spellact "+spell+" button'><strong>-</strong></td><td class='prepact "+spell+" button'><strong>-</strong></td><td class='spellname "+spell+"'>"+spellhold["name"]+"</td><td class='heaEss "+spell+"'>"+spellhold["essence"]+"</td><td class='spelltype "+spell+"'>"+spellhold["type"]+"</td><td class='spellrange "+spell+"'>"+spellhold["range"]+"</td><td class='spelldur "+spell+"'>"+spellhold["duration"]+"</td><td class='drain "+spell+"'>"+spellhold["drain"].toString()+"</td></tr>"));//Add the spell to the list on the DOM after where it was entered

    }
}

$(".formact").click(complexFormActivate);

function complexFormActivate() {
    var form=complexforms[$(this).parent().attr("id")];
    
    if($(this).hasClass("active")){//if the complex form has already been activated, then do this stuff
        deactivate($(this));//remove the active class, and change the + to a -
        form["formact"]=false;//the form is turned off
        forms++;//return complex form points to buy more forms
    } else {//If the form isn't on, then its off, so do this stuff
        if (forms>0) {//do you have complex form points to buy more forms?
            activate($(this));//Then add the active class and replace the - with a +
            form["formact"]=true;//turn off complex form
            forms--;//reduce form points
        }
    }
    attDisplay();
}
function activate(x) {//this will highlight and add a + to show that the thing is active
    x.addClass("active").empty().append("<strong>+</strong>");
}

function deactivate(x) {//this will turn off the highlight and change the + to a - to show its inactive
    x.removeClass("active").empty().append("<strong>-</strong>");
}

$(".weapact").click(buyWeapon);
var invNum=1;//inventory number for naming two items of the same kind
function buyWeapon() {
    if ($(this).hasClass("deact")) {
        return;
    }
    var itemhold=weapons[$(this).parent().attr("id")];
    var item=$(this).parent().attr("id");
    var itemNum = item+invNum;
    var gotMoney = nuyen-itemhold["cost"]>0;
    inventory[itemNum]={};//this creates a blank object for the weapon's stats to be added too
    for (key in itemhold) {
        if (key=="mods") {//when we get to the key called mods in the weapon, do this
            inventory[itemNum][key] = {};//make a blank key for the mod
            for (subkey in itemhold[key]) {//this creates a section for the mods for each instance of a gun, so gun instances don't end up sharing all the same mods
                inventory[itemNum][key][subkey] = itemhold[key][subkey];
            } 
        } else {
            inventory[itemNum][key] = itemhold[key];
        }
    }
    inventory[itemNum]["active"]=true;
    if ($(this).closest(".meleeweapon").hasClass("meleeweapon")&&gotMoney) {//this you buy a melee weapon do this stuff
        $("#"+item).after("<tr id='"+itemNum+"'><td class='sell button'><em>-</em></td><td>"+itemhold["name"]+"</td><td class='inventory "+item+itemNum+"' colspan=5></td><td class='custWeapPrice'>"+itemhold["cost"]+"&#65509</td></tr>");
        if (magic>0) {
            inventory[itemNum]["weaponfoci"]=0;
            $("<td class='label'>Weapon Focus</td><td class='"+itemNum+" incAtt weaponfoci'>+</td><td class='focirating weaponfoci'>0</td><td class='"+itemNum+" decAtt weaponfoci'>-</td>").appendTo($(".inventory."+item+itemNum));
        }
        
        buyingItem(itemhold);
    }
    if ($(this).hasClass("bow")&&gotMoney) {//buying bows
        addingArrows(7,"#bow",item,itemNum,"Arrows");
        buyingItem(itemhold);
    }
    if ($(this).closest(".crossbow").hasClass("crossbow")&&gotMoney) {//buying crossbows
        addingArrows(4,"#"+item,item,itemNum,"Bolts");
        buyingItem(itemhold);
    }
    if ($(this).hasClass("shuriken")&&gotMoney) {//buying throwing weapons
        inventory[itemNum]["arrow"]=1;
        $("#shuriken").after("<tr id='"+itemNum+"'><td class='sell button'><em>-</em></td><td class='inventory "+item+itemNum+"' colspan=4></td><td class='custWeapPrice'></td></tr>");
        $(".inventory."+item+itemNum).append("<td class='label'>Shuriken/Throwing Knives</td><td class='"+itemNum+" incAtt arrow'>+</td><td class='arrowNum arrow'>1</td><td class='"+itemNum+" decAtt arrow'>-</td>");
        buyingItem(itemhold);
    }
    licenseDP(itemNum,item,itemhold,"");//adds license and dice pool
    
    if ($(this).closest(".firearms").hasClass("firearms")&&gotMoney) {//this adds firearms
        $("#"+item).after("<tr id='"+itemNum+"' class='invName'><td class='sell button'><em>-</em></td><td class='inventory "+item+itemNum+"' colspan=8></td><td class='custWeapPrice'></td></tr>");
        buyingItem(itemhold);//this takes money out of the nuyen, so buys the item
        
        $(".inventory."+item+itemNum).append("<tr class='mounts'></tr>");//this adds the area for the gun mounts
        var acctarget=".inventory."+item+itemNum+" .mounts";
        $(acctarget).append("<tr><td class='label'>Top</td><td class='label'>Barrel</td><td class='label'>Under</td></tr>");
        $(acctarget).append("<tr><td class='topmount "+itemNum+"'>n/a</td><td class='barrelmount "+itemNum+"'>n/a</td><td class='underbarrel "+itemNum+"'>n/a</td></tr>");
        topMount(item,itemNum);//if it allows top mounts, it will add them
        barrelMount(item,itemNum);//if the gun allows barrel mounts it'll add the options
        bottomMount(item,itemNum);//this adds under barrel mounts
        holsterAddOn(itemhold,itemNum,item);//adds holster if a gun supports it
        $(".inventory."+item+itemNum).append("<tr class='accessories'></tr>");//this is where nonmount accessories go
        acctarget=".inventory."+item+itemNum+" .accessories";//makes targetting accessories eaiser
        $(acctarget).append("<tr class='nonmounts "+itemNum+"'></tr>");//puting a row in a row breaks the normal table
        var nonmount=".nonmounts."+itemNum;
        if (itemhold.avail+2<=12||itemhold.mods.internalsmart=="Smartgun") {//adding a internal smartgun increaes avail, this doesn't go over 12
            $(nonmount).append("<td class='label'>Internal Smartgun</td><td class='smartgun "+itemNum+" button'>+</td>");
        }
        if (itemhold.mods.internalsmart=="Smartgun") {//if the gun already has an internal smartgun system, this prevents people from adding another one
            $(".smartgun."+itemNum).addClass("deact active").empty().append("-");
        }
        var skillcheck=itemhold.skill;
        if (itemhold.category=="assaultrifles"||skillcheck=="longarms"||skillcheck=="heavyweapons") {//add shockpad to some guns
            $(nonmount).append("<td class='label'>Shock Pad</td><td class='shockpad "+itemNum+" button'>+</td>");
        }
        if (itemhold.damtype=="Grenade"||itemhold.damtype=="Missile") {//adds airburst link to explosive weapons
            $(nonmount).append("<td class='label'>Airburst Link</td><td class='airburstlink "+itemNum+" button'>+</td>");
        }
        if (itemhold.mods.integral!="n/a") {//adds accessories that are already built in to the smartgun
            $(nonmount).append("<td class='label'>Integral</td><td class='integral "+itemNum+" active' colspan=2>"+itemhold["mods"]["integral"]+"</td>")
        }
        
        $(nonmount).after("<table><tr class='options'></tr></table>");//adds a new table so that the clip and fake licenses don't get all scretched out
        if (itemhold.clip=="Clip") {//adds spare clips
            moreclips(itemNum,item,"Clips");
        } else if (itemhold.clip=="Detachable Cylinder"||itemhold.clip=="Cylinder") {//add speed loader for revolvers
            moreclips(itemNum,item,"Speed Loader");
        }
        licenseDP(itemNum,item,itemhold," .options");//add license and dicepool
        $(".inventory."+item+itemNum+" .options .labelDP").before("<td class='label'>Acc</td><td class='acc "+itemNum+"'>"+itemhold.accuracy+"("+(itemhold.accuracy+itemhold.accmod)+")"+"</td><td class='label'>RC</td><td class='rc "+itemNum+"'>"+itemhold.rc+Math.ceil((str/3)+1)+"("+(itemhold.rc+itemhold.rcmod+Math.ceil((str/3)+1))+")"+"</td>");
        $(".inventory."+item+itemNum+" .options").append("<td class='label'>Avail</td><td class='avail "+itemNum+"'>"+itemhold.avail+" "+itemhold.restrict+"</td>");
    }
    
    function moreclips(x,y,z) {
        inventory[itemNum]["extraclips"]=0;
        $("<td class='label'>"+z+"</td><td class='"+x+" incAtt extraclips'>+</td><td class='numofclips extraclips'>0</td><td class='"+x+" decAtt extraclips'>-</td>").appendTo($(".inventory."+y+x+" .options"));
    }
    
    function holsterAddOn(x,y,z) {//x=itemhold, y=itemNum,z=item
        var check=x["category"];
        if (check=="lightpistols"||check=="tasers"||check=="holdouts") {//checks to see if small arms to use arm silder
            makeholster(y,z);
            $(".holster."+y).append("<td class='concealableholster "+y+" button'>Concealable Holster</td><td class='hiddenarmslide "+y+" button'>Hidden Arm Slide</td><td class='quickdrawholster "+y+" button'>Quick-draw Holster</td>");
        };
        if (check=="heavypistols"||check=="machinepistols") {//checks to see if larger small arms that can usholsters that are not arm slider
            makeholster(y,z);
            $(".holster."+y).append("<td class='concealableholster "+y+" button'>Concealable Holster</td><td class='quickdrawholster "+y+" button'>Quick-draw Holster</td>");
        }
    }
    
    function makeholster(y,z) {//adds the stuff to make the holsters
        $(".inventory."+z+y).append("<tr class='holsters "+y+"'></tr>");
        $(".holsters."+y).append("<tr class='holster "+y+"'><td class='label'>Holster</td></tr>");
    }
    
    function licenseDP(x,y,z,l) {
        if (z["restrict"]=="Restricted") {//if restricted add the ability to buy a fake license
            inventory[x]["license"]=0;
            $("<td class='label'>Fake License</td><td class='"+x+" incAtt license'>+</td><td class='licenserating license'>0</td><td class='"+x+" decAtt license'>-</td>").appendTo($(".inventory."+y+x+l));
        }
        $("<td class='labelDP label'>DP</td><td class='weaponDP'>"+(activeSkills[inventory[x]["skill"]]["rating"]+activeSkills[inventory[x]["skill"]]["stat"]+activeSkills[inventory[x]["skill"]]["mod"])+"</td>").appendTo($(".inventory."+y+x+l));
        
    }
    
    function topMount(x,y) {
        if (weapons[x]["mods"]["top"]=="empty") {
            $(".topmount."+y).empty().append("<select><option value='empty'>Empty</option><option value='Laser Sight'>Laser Sight</option><option value='Imaging Scope'>Imaging Scope</option><option value='Periscope'>Periscope</option><option value='Smartgun'>Smartgun</option></select>");
        };
    }
    function barrelMount(x,y) {
        if (weapons[x]["mods"]["barrel"]=="empty") {
            $(".barrelmount."+y).empty().append("<select><option value='empty'>Empty</option><option value='Gas Vent 1'>Gas Vent System 1</option><option value='Gas Vent 2'>Gas Vent System 2</option><option value='Gas Vent 3'>Gas Vent System 3</option><option value='Silencer'>Silencer</option></select>");
        };
    }
    function bottomMount(x,y) {
        if (weapons[x]["mods"]["under"]=="empty") {
            $(".underbarrel."+y).empty().append("<select><option value='empty'>Empty</option><option value='Laser Sight'>Laser Sight</option><option value='Bipod'>Bipod</option><option value='Smart Firing Platform'>Smart Firing Platform</option><option value='Smartgun'>Smartgun</option><option value='Tripod'>Tripod</option></select>");
            if (weapons[x]["skill"]=="heavyweapons"||weapons[x]["category"]=="assaultrifles") {
                $(".underbarrel."+y+" select").append("<option value='Gyro Mount'>Gyro Mount</option>");
            }
        };
    }
    
    function addingArrows(v,w,x,y,z) {//v=number of columns, w=if to target to set item after, x=the weapon, y=weapon+number from inventory, z=name of projectile
        inventory[y]["arrow"]=0;
        inventory[y]["inject"]=0;
        $(w).after("<tr id='"+y+"'><td class='sell button'><em>-</em></td><td class='inventory "+x+y+"' colspan="+v+"></td><td class='custWeapPrice'></td></tr>");
        $(".inventory."+x+y).append("<td class='label'>"+z+"</td><td class='"+y+" incAtt arrow'>+</td><td class='arrowNum arrow'>0</td><td class='"+y+" decAtt arrow'>-</td><td class='label'>Injection "+z+"</td><td class='"+y+" incAtt injarrow'>+</td><td class='arrowNum injarrow'>0</td><td class='"+y+" decAtt injarrow'>-</td>");
    }
    
    function buyingItem(itemhold) {//reduces money based on the cost of the item
        nuyen-=itemhold["cost"];
    }
    invNum++;
    attDisplay();
}

$("#gearResource").on("click",".sell", sellWeapon);

function sellWeapon() {
    var item = $(this).parent().attr("id")
    nuyen+=inventory[item]["cost"];
    inventory[item]["active"]=false;
    fociRating-=inventory[item]["weaponfoci"];
    if (inventory[item]["weaponfoci"]>0) {
        karma+=inventory[item]["weaponfoci"]*3;
    };
    $(this).parent().remove();
    delete inventory[item];
    nuyenUpdater();
}

$( "#firearms" ).on( "change", "select", settingWeapon );

function settingWeapon() {//this will change the weapon mounts and the nuyen
    var item = $(this).closest(".invName").attr("id");
    var itemmod=inventory[item]["mods"]
    var itemhold=inventory[item];
    
    itemmod.top=mountCheck($(".topmount."+item+" select").val(),itemmod.top,itemmod.under);
    itemmod.barrel=mountCheck($(".barrelmount."+item+" select").val(),itemmod.barrel);
    itemmod.under=mountCheck($(".underbarrel."+item+" select").val(),itemmod.under,itemmod.top);
    
    
    function mountCheck(x,y,z) {
        if (x!=y) {//reset stats below
            price=thePriceisRight(y);//the price of the old mod
            nuyen+=price;//returns money of the old mod
            inventory[item]["cost"]-=price;//takes out of the price of the old mod
            itemhold["rc"]-=addingRecoil(y);//takes away the recoil of the old mod
            itemhold["rcmod"]-=moddingRecoil(y);//takes away the recoil mod of the old mod
            itemhold["accmod"]-=addingAccurecy(y,z);
            
            //set new stats below
            price=thePriceisRight(x);//sets the new price
            nuyen-=price;//reduces the nuyen by the price of the new mod
            inventory[item]["cost"]+=price;//adds the price of the new mod to the gun's price
            itemhold["rc"]+=addingRecoil(x);//sets the new recoil
            itemhold["rcmod"]+=moddingRecoil(x);//sets the new recoil mod
            itemhold["accmod"]+=addingAccurecy(x,z);
        };
        return x;
    }
    
    function addingAccurecy(x,z) {
        if (x=="Smartgun"||z=="Smartgun"||itemmod["internalsmart"]=="Smartgun") {//this figures out of accurecy bonus
            y=2;
        } else if (x=="Laser Sight"||z=="Laser Sight"||itemmod["integral"].indexOf("Laser Sight") !== -1) {
            y=1;
        } else {
            y=0;
        };
        return y;
    }
    
    function moddingRecoil(x) {
        if (x=="Tripod"||x=="Gyro Mount") {
            y=6;
        } else if (x=="Bipod") {
            y=2;
        } else {
            y=0;
        };
        return y;
    }
    
    function addingRecoil(x) {
        if (x=="Gas Vent 3"||itemmod["integral"].indexOf("Gas Vent 3") !== -1) {//gas vents apparently determine the natural recoil
            y=3;
        } else if (x=="Gas Vent 2"||itemmod["integral"].indexOf("Gas Vent 2") !== -1) {
            y=2;
        } else if (x=="Gas Vent 1"||itemmod["integral"].indexOf("Gas Vent 1") !== -1) {
            y=1;
        } else {
            y=0
        };
        return y
    }
    
    function thePriceisRight(x) {//this is the price of all the mods
        switch (x) {
            default:
                y=0;
                break;
            case "Laser Sight":
                y=125;
                break;
            case "Imaging Scope":
                y=300;
                break;
            case "Periscope":
                y=70;
                break;
            case "Smartgun":
                y=200;
                break;
            case "Gas Vent 1":
                y=200;
                break;
            case "Gas Vent 2":
                y=400;
                break;
            case "Gas Vent 3":
                y=600;
                break;
            case "Silencer":
                y=500;
                break;
            case "Bipod":
                y=200;
                break;
            case "Gyro Mount":
                y=1400;
                break;
            case "Smart Firing Platform":
                y=2500;
                break;
            case "Tripod":
                y=500;
                break;
        }
        return y;
    }
    
    attDisplay();
}

$("#firearms").on("click",".smartgun.button",thinkingsmart)

function thinkingsmart() {//the interal smartgun button
    if ($(this).hasClass("deact")) {//if the button is deactivated, do nothing
        return;
    }
    
    var item = $(this).closest(".invName").attr("id");
    var itemmod=inventory[item]["mods"];
    var itemhold=inventory[item];
    
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        itemmod["internalsmart"]="empty"
        if (itemmod.top=="Smartgun"||itemmod.under=="Smartgun") {//this figures out of accurecy bonus
            itemhold["accmod"]-=0;
        } else if (itemmod.top=="Laser Sight"||itemmod.under=="Laser Sight"||itemmod["integral"].indexOf("Laser Sight") !== -1) {
            itemhold["accmod"]-=1;
        } else {
            itemhold["accmod"]-=2;
        };
        for (key in weapons) {
            if (weapons[key]["name"]==itemhold["name"]) {
                nuyen+=weapons[key]["cost"];
                itemhold["cost"]-=weapons[key]["cost"];
                itemhold["avail"]-=2;
                if (weapons[key]["restrict"]==" ") {
                    itemhold["restrict"]=" "
                }
            }
        }
    } else {
        $(this).addClass("active");
        itemmod["internalsmart"]="Smartgun"
        if (itemmod.top=="Smartgun"||itemmod.under=="Smartgun") {//this figures out of accurecy bonus
            itemhold["accmod"]+=0;
        } else if (itemmod.top=="Laser Sight"||itemmod.under=="Laser Sight"||itemmod["integral"].indexOf("Laser Sight") !== -1) {
            itemhold["accmod"]+=1;
        } else {
            itemhold["accmod"]+=2;
        };
        for (key in weapons) {
            if (weapons[key]["name"]==itemhold["name"]) {
                nuyen-=weapons[key]["cost"];
                itemhold["cost"]+=weapons[key]["cost"];
                itemhold["avail"]+=2;
                if (itemhold["restrict"]==" ") {
                    itemhold["restrict"]="Restricted"
                }
            }
        }
    }
    attDisplay();
}

$("#firearms").on("click",".shockpad.button",shockpadding)

function shockpadding() {
    if ($(this).hasClass("deact")) {//if the button is deactivated, do nothing
        return;
    }
    
    var item = $(this).closest(".invName").attr("id");
    var itemmod=inventory[item]["mods"];
    var itemhold=inventory[item];
    
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        itemmod["shockpad"]="empty"
        itemhold["rc"]--;
        nuyen+=50;
        itemhold["cost"]-=50; 
    } else {
        $(this).addClass("active");
        itemmod["shockpad"]="Shock Pad"
        itemhold["rc"]++;
        nuyen-=50;
        itemhold["cost"]+=50;
    }
    attDisplay();
}

$("#firearms").on("click",".airburstlink.button",airJordan)

function airJordan() {//this is for airbustlink for explosive weapons
    if ($(this).hasClass("deact")) {//if the button is deactivated, do nothing
        return;
    }
    
    var item = $(this).closest(".invName").attr("id");
    var itemmod=inventory[item]["mods"];
    var itemhold=inventory[item];
    
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        itemmod["airburstlink"]=false;
        nuyen+=600;
        itemhold["cost"]-=600;
    } else {
        $(this).addClass("active");
        itemmod["airburstlink"]=true;
        nuyen-=600;
        itemhold["cost"]+=600;
    }
    attDisplay();
}

$("#firearms").on("click",".concealableholster.button, .hiddenarmslide.button, .quickdrawholster.button",holSTAR)

function holSTAR () {//this creates and manages the background stuff for the holsters of a gun
    var item = $(this).closest(".invName").attr("id");
    var itemmod=inventory[item]["mods"];
    var itemhold=inventory[item];
    
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        if ($(this).hasClass("concealableholster")) {
            itemmod["concealableholster"]=false;
            nuyen+=150;
            itemhold["cost"]-=150;
        }
        if ($(this).hasClass("hiddenarmslide")) {
            itemmod["hiddenarmslide"]=false;
            nuyen+=350;
            itemhold["cost"]-=350;
        }
        if ($(this).hasClass("quickdrawholster")) {
            itemmod["quickdrawholster"]=false;
            nuyen+=175;
            itemhold["cost"]-=175;
        }
    } else {
        $(this).addClass("active");
        if ($(this).hasClass("concealableholster")) {
            itemmod["concealableholster"]=true;
            nuyen-=150;
            itemhold["cost"]+=150;
        }
        if ($(this).hasClass("hiddenarmslide")) {
            itemmod["hiddenarmslide"]=true;
            nuyen-=350;
            itemhold["cost"]+=350;
        }
        if ($(this).hasClass("quickdrawholster")) {
            itemmod["quickdrawholster"]=true;
            nuyen-=175;
            itemhold["cost"]+=175;
        }
    }
    attDisplay();
}

//adding ammo details below

$(".ammo.label").appendTo(".ammunition");//adds ammo label

for (ammo in ammunition) {
    var ammotype=ammunition[ammo];
    
    switch (ammotype["class"]) {
        case "taserammo":
            abnormalAmmo(ammotype, ammo);
            break;
        case "specialammo":
            abnormalAmmo(ammotype, ammo);
            break;
        case "cannonammo":
            abnormalAmmo(ammotype, ammo);
            break;
        case "grenades":
            explosivesammo("grenadeammo",ammo,ammotype);
            break;
        case "rockets":
            explosivesammo("rocketammo",ammo,ammotype);
            break;
        case "none":
            $(".standard.ammunition").append("<tr class='"+ammo+"'><td class='buyammo button'>+</td><td class='ammountofammo'>0</td><td class='sellammo button'>-</td><td class='ammoname'>"+ammotype["name"]+"</td><td class='dammod'>"+ammotype["dammod"]+" "+ammotype["typemod"]+" "+ammotype["elemod"]+"</td><td class='apmod'>"+ammotype["apmod"]+"</td><td class='avail'>"+ammotype["avail"]+" "+ammotype["restrict"]+"</td><td class='cost'>"+ammotype["cost"]+"&#65509</td></tr>");
            break;
    }
    
    if (ammotype["avail"]>12) {
        $("."+ammo+" .button").addClass("deact");
    }
    
}

$(".gas .grenadesname").empty().append("<select class='toxicgas'></select>");

for (dose in toxin) {
    if (toxin[dose]["avail"]<12) {
        $(".toxicgas").append("<option value='"+dose+"'>"+toxin[dose]["name"]+"</option>")
    }
}

$(".holdoutammo .tracer, .lightammo .tracer, .heavyammo .tracer, .sniperammo .tracer, .shotgunammo .tracer").remove();

function explosivesammo(x,y,z) {
    $("."+x).append("<tr class='"+y+"'><td class='buygrenades button'>+</td><td class='ammountofammo'>0</td><td class='sellgrenades button'>-</td><td class='grenadesname'>"+z["name"]+"</td><td class='grenadesdammod'>"+z["dammod"]+" "+z["typemod"]+" "+z["elemod"]+"</td><td class='apmod'>"+z["apmod"]+"</td><td class='blast'>"+z["blast"]+"</td><td class='avail'>"+z["avail"]+" "+z["restrict"]+"</td><td class='cost'>"+z["cost"]+"&#65509</td></tr>");
}

function abnormalAmmo(x,y) {
    $("."+x["class"]).append("<tr class='"+y+"'><td class='buyammo button'>+</td><td class='ammountofammo'>0</td><td class='sellammo button'>-</td><td class='ammoname'>"+x["name"]+"</td><td class='dammod'>"+x["dammod"]+x["typemod"]+" "+x["elemod"]+"</td><td class='apmod'>"+x["apmod"]+"</td><td class='avail'>"+x["avail"]+" "+x["restrict"]+"</td><td class='cost'>"+x["cost"]+"&#65509</td></tr>");
}

$("#ammunition").on("click", ".buyammo,.sellammo,.buygrenades,.sellgrenades", buyingammo);

function buyingammo() {
    var ammo=$(this).parent().attr("class");
    var gunclass=$(this).closest(".ammunition").attr("id");
    if ($(this).parent().hasClass("gas")) {
        gasname=$("select.toxicgas").val();
        gas=toxin[gasname];
        if (typeof ammunition[gasname]==='undefined') {
            ammunition[gasname]= {name:gas["name"], ammo:0, class:"grenades", dammod:gas["power"], typemod:gas["effect"], elemod: "", apmod:0, blast: "10m Radius", avail:gas["avail"]+2, restrict: gas["restrict"], cost:gas["cost"]+40}
            
            z=ammunition[gasname]
            $(".gas").after("<tr class='"+gasname+"'><td class='buygrenades button'>+</td><td class='ammountofammo'>0</td><td class='sellgrenades button'>-</td><td class='grenadesname'>"+z["name"]+"</td><td class='grenadesdammod'>"+z["dammod"]+" "+z["typemod"]+" "+z["elemod"]+"</td><td class='apmod'>"+z["apmod"]+"</td><td class='blast'>"+z["blast"]+"</td><td class='avail'>"+z["avail"]+" "+z["restrict"]+"</td><td class='cost'>"+z["cost"]+"&#65509</td></tr>");
        }
        return;
    }
    if (typeof inventory[gunclass+ammo]==='undefined') {
        inventory[gunclass+ammo]={};
        
        for (key in ammunition[ammo]) {
            inventory[gunclass+ammo][key]=ammunition[ammo][key];
        }
    }
    
    var invammo=inventory[gunclass+ammo];
    inventory[gunclass+ammo]["class"]=gunclass;
    if (nuyen-inventory[gunclass+ammo]["cost"]>0 && $(this).hasClass("buyammo")) {
        addAmmo($(this),gunclass+ammo,10,invammo);
    } else if (inventory[gunclass+ammo]["ammo"]>0&&$(this).hasClass("sellammo")) {
        subAmmo($(this),gunclass+ammo,10,invammo);
    } else if (nuyen-inventory[gunclass+ammo]["cost"]>0 && $(this).hasClass("buygrenades")) {
        addAmmo($(this),gunclass+ammo,1,invammo);
    } else if (inventory[gunclass+ammo]["ammo"]>0&&$(this).hasClass("sellgrenades")) {
        subAmmo($(this),gunclass+ammo,1,invammo);
    }
    nuyenUpdater();
}

function addAmmo(w,x,y) {//w=this, x=name of ammo in inventory, y=ammount of ammo bought at a time
    inventory[x]["ammo"]+=y;
    nuyen-=inventory[x]["cost"];
    $(w.next(".ammountofammo")).empty().append(inventory[x]["ammo"]);
}
function subAmmo(w,x,y) {//w=this, x=name of ammo in inventory, y=ammount of ammo bought at a time
    inventory[x]["ammo"]-=y;
    nuyen+=inventory[x]["cost"];
    $(w.prev(".ammountofammo")).empty().append(inventory[x]["ammo"]);
}

//expolsives ammo after this

$("#grenadeammo .blastafter, #rocketammo .blastafter").after("<td>Blast</td>");

$( ".grenadesname" ).on( "change", "select.toxicgas", toxicgas );

gasgrenade("teargas");//sets grenade at start
$(".gas .sellgrenades").addClass("deact");

function toxicgas() {
    gasgrenade($(this).val());
}

function gasgrenade(x) {
    $(".gas .grenadesdammod").empty().append(toxin[x]["power"]+" "+toxin[x]["effect"]);
    $(".gas .avail").empty().append((toxin[x]["avail"]+2)+" "+toxin[x]["restrict"]);
    $(".gas .cost").empty().append((toxin[x]["cost"]+40)+"&#65509;");
}

$("#explosive .label").appendTo($(".explosives"));

for (bomb in explosives) {
    $("."+bomb+".explosives").append("<tr class='"+bomb+"'><td class='buybomb button'><strong>+</strong></td><td class='bombup button'>+</td><td class='explosiverating'>"+explosives[bomb]["rating"]+"</td><td class='bombdown button'>-</td><td>"+explosives[bomb]["avail"]+" "+explosives[bomb]["restrict"]+"</td><td class='bombbond'>"+explosives[bomb]["cost"]+"&#65509;</td></tr>");
}

$(".commercial .bombup,.commercial .bombdown, .plastic .buybomb").addClass("deact");
$(".plastic .buybomb").empty().append("-");

$("#explosive").on("click", ".bombup, .bombdown", kaboom);

function kaboom() {
    if ($(this).hasClass("deact")) {
        return;
    }
    var bomb=$(this).parent().attr("class");
    if ($(this).hasClass("bombup")&&explosives[bomb]["rating"]<25) {
        explosives[bomb]["rating"]++;
        bombupdate(bomb);
    } else if ($(this).hasClass("bombdown")&&explosives[bomb]["rating"]>6) {
        explosives[bomb]["rating"]--;
        bombupdate(bomb);
    }
    
    function bombupdate(x) {
        $("."+x+" .explosiverating").empty().append(explosives[x]["rating"]);
        explosives[x]["cost"]=explosives[x]["rating"]*100;
        $("."+x+" .bombbond").empty().append(explosives[x]["cost"]+"&#65509;");
    }
}

$("#explosive").on("click", ".buybomb,.sellbomb", bombsaway);//buy and sell explosives

function bombsaway() {
    var bomb=$(this).parent().attr("class");
    if ($(this).hasClass("buybomb")&&nuyen-explosives[bomb]["cost"]>0) {
        inventory[bomb+invNum]={};
        bombname=bomb+invNum;
        for (key in explosives[bomb]) {
            inventory[bombname][key]=explosives[bomb][key];
        }
        inventory[bombname]["kg"]=1;
        $("."+bomb+".explosives").append("<tr class='"+bombname+"'><td class='sellbomb button'><em>-<em></td><td class='inventory' colspan=4></td><td class='bombprice'>"+inventory[bombname]["cost"]+"&#65509;</td></tr>");
        $("."+bombname+" .inventory").append("<td class='label'>Rating</td><td>"+inventory[bombname]["rating"]+"</td><td class='label'>Kilograms</td><td class='kgup button'>+</td><td class='kg'>"+inventory[bombname]["kg"]+"</td><td class='kgdown button'>-</td>");
        
        invNum++
        nuyen-=inventory[bombname]["cost"];
    } else if ($(this).hasClass("sellbomb")) {
        $("."+bomb).remove();
        nuyen+=inventory[bomb]["cost"];
        delete inventory[bomb];
    }
    
    nuyenUpdater();
}

$("#explosive").on("click", ".kgup, .kgdown", fatboy);

function fatboy() {
    var bomb=$(this).parent().parent().attr("class");
    if ($(this).hasClass("kgup")&&nuyen-inventory[bomb]["rating"]*100>0) {
        inventory[bomb]["kg"]++;
        bombupdate(bomb);
        if (inventory[bomb]["name"]=="Commercial") {
            nuyen-=100
        } else {
            nuyen-=inventory[bomb]["rating"]*100;
        }
    } else if ($(this).hasClass("kgdown")&&inventory[bomb]["kg"]>0) {
        inventory[bomb]["kg"]--;
        bombupdate(bomb);
        if (inventory[bomb]["name"]=="Commercial") {
            nuyen+=100
        } else {
            nuyen+=inventory[bomb]["rating"]*100;
        }
    }
    nuyenUpdater();
    
    function bombupdate(x) {
        $("."+x+" .kg").empty().append(inventory[x]["kg"]);
        if (inventory[x]["name"]=="Commercial") {
            inventory[x]["cost"]=inventory[x]["kg"]*100;
        } else {
            inventory[x]["cost"]=inventory[x]["kg"]*(inventory[x]["rating"]*100);
        }
        $("."+x+" .bombprice").empty().append(inventory[x]["cost"]+"&#65509;");
    }
}

$(".detonator").append("<tr class='label'><td>Buy</td><td>Ammount</td><td>Sell</td><td>Availability</td><td>Cost</td></tr><tr><td class='buyDet button'>+</td><td class='caps'>0</td><td class='sellDet button'>-</td><td>"+detonator.avail+" "+detonator.restrict+"</td><td>"+detonator.cost+"&#65509;</td></tr>");

$("#explosive").on("click", ".buyDet, .sellDet", buyDetonator);

function buyDetonator() {
    if (typeof inventory["detonator"]==='undefined') {
        inventory["detonator"]={}
        for (key in detonator) {
            inventory["detonator"][key]=detonator[key];
        }
    }
    if ($(this).hasClass("buyDet")&&nuyen-inventory["detonator"]["cost"]>0) {
        inventory["detonator"]["ammount"]++;
        nuyen-=inventory["detonator"]["cost"];
    } else if ($(this).hasClass("sellDet")&&inventory["detonator"]["ammount"]>0) {
        inventory["detonator"]["ammount"]--;
        nuyen+=inventory["detonator"]["cost"];
    }
    $(".caps").empty().append(inventory["detonator"]["ammount"]);
    nuyenUpdater();
    
}



for (type in armor) {
    $("#clotharmor #bodyarmor tbody").append("<tr class='"+type+"'><td class='buyarmor button'><strong>+</strong></td><td>"+armor[type]["name"]+"</td><td>"+armor[type]["armor"]+"</td><td>"+armor[type]["avail"]+" "+armor[type]["restrict"]+"</td><td>"+armor[type]["cost"]+"&#65509;</td></tr>");
    if (armor[type]["avail"]>12) {
        $("."+type+" .buyarmor").addClass("deact").empty().append("-");
    }
}

$("#clotharmor").on("click", ".buyarmor", sponge);

function sponge() {
    var armtype = $(this).parent().attr("class");
    if (nuyen-armor[armtype]["cost"]<0||$(this).hasClass("deact")) {
        return;
    }
    inventory[armtype+invNum]={}
    for (key in armor[armtype]) {
        inventory[armtype+invNum][key]=armor[armtype][key];
    }
    $("."+armtype).after("<tr class='"+armtype+invNum+"'><td class='sellarmor button'><em>-</em></td><td class='armormods' colspan=3></td><td class='armorcost'>"+inventory[armtype+invNum]["cost"]+"&#65509;</td></tr>");
    inventory[armtype+invNum]["mods"]={};//create emtpy mods section for intentory armor
    for (mods in armormods) {//this will add the mods
        inventory[armtype+invNum]["mods"][mods]={};//this will add the name of the mods
        for (modstats in armormods[mods]) {
            inventory[armtype+invNum]["mods"][mods][modstats]=armormods[mods][modstats]//this adds all the stats for each mod
        }
        if (typeof armormods[mods]["rating"]!=="undefined") {//this is for mods that don't have ratings
            $("."+armtype+invNum+" .armormods").append("<tr class='"+mods+"'><td class='label'>"+inventory[armtype+invNum]["mods"][mods]["name"]+"</td><td class='armmodup button'>+</td><td class='armmodrating'>0</td><td class='armmoddown button'>-</td><td class='label'>Capacity</td><td class='armorcap'>"+inventory[armtype+invNum]["mods"][mods]["capacity"]+"</td></tr>");
        } else if (typeof armor[armtype]["helm"]==="undefined"&&mods=="chemicalseal") {//this checks to see if the armor has a helm
            //do nothing
        } else {//this adds all other mods
            modnorating(armtype+invNum,mods)
        }
    }
    if (inventory[armtype+invNum]["helm"]==false) {//if the armor supports a helm, add it to the mods
        $("."+armtype+invNum+" .armormods").append("<tr class='helm'><td class='label'>Helmet</td><td class='buyhelmmod button' colspan=3><strong>+</strong></td></tr>");
    }
    nuyen-=armor[armtype]["cost"];
    invNum++;
    nuyenUpdater();
    
    function modnorating(x,y) {
        $("."+x+" .armormods").append("<tr class='"+y+"'><td class='label'>"+inventory[armtype+invNum]["mods"][y]["name"]+"</td><td class='buyarmmod button' colspan=3><strong>+</strong></td><td class='label'>Capacity</td><td>"+inventory[armtype+invNum]["mods"][y]["capacity"]+"</td></tr>");
    }
}
$("#clotharmor").on("click", ".sellarmor", naked);

function naked() {//this sells armor
    var armtype = $(this).parent().attr("class");
    nuyen+=inventory[armtype]["cost"];
    $("."+armtype).remove();
    delete inventory[armtype];
    nuyenUpdater();
}

$("#clotharmor").on("click", ".armmodup, .armmoddown, .buyarmmod", armormodding);

function armormodding() {
    mod = $(this).parent().attr("class");
    item = $(this).parent().parent().parent().attr("class");
    invmod = inventory[item]["mods"][mod];
    var legit=nuyen-invmod["cost"]>0
    if ($(this).hasClass("armmodup")&&invmod["rating"]<6&&inventory[item]["capacity"]<inventory[item]["armor"]&&legit) {
        invmod["rating"]++;
        inventory[item]["capacity"]++;
        nuyen-=invmod["cost"];
        inventory[item]["cost"]+=invmod["cost"];
        modUpdater (item,mod,invmod);
    } else if ($(this).hasClass("armmoddown")&&invmod["rating"]>0) {
        invmod["rating"]--;
        inventory[item]["capacity"]--;
        nuyen+=invmod["cost"];
        inventory[item]["cost"]-=invmod["cost"];
        modUpdater (item,mod,invmod);
    } else if ($(this).hasClass("buyarmmod")&&invmod["active"]==false&&invmod["capacity"]+inventory[item]["capacity"]<=inventory[item]["armor"]&&legit) {
        inventory[item]["capacity"]+=invmod["capacity"];
        nuyen-=invmod["cost"];
        inventory[item]["cost"]+=invmod["cost"];
        invmod["active"]=true;
        sellsign ($(this));
        costUpdater (item);
        if (mod=="chemicalseal"&&inventory[item]["helm"]==false) {
            turnonhelm (item,$("."+item+" .buyhelmmod"))
        }
    } else if ($(this).hasClass("buyarmmod")&&invmod["active"]==true) {
        inventory[item]["capacity"]-=invmod["capacity"];
        nuyen+=invmod["cost"];
        inventory[item]["cost"]-=invmod["cost"];
        invmod["active"]=false;
        buysign ($(this));
        costUpdater (item);
    }
    nuyenUpdater();
    
    function modUpdater(x,y,z) {
        $("."+x+" ."+y+" .armmodrating, ."+x+" ."+y+" .armorcap").empty().append(z["rating"]);
        costUpdater (x);
    }
    
}

function costUpdater (x) {
    $("."+x+" .armorcost").empty().append(inventory[x]["cost"]+"&yen;");
}

function sellsign(x) {
    x.empty().append("<em>-</em>");
}

function buysign(x) {
    x.empty().append("<strong>+</strong>");
}

$("#clotharmor").on("click", ".buyhelmmod", helmup);

function helmup() {
    item = $(this).parent().parent().parent().attr("class");
    if (inventory[item]["helm"]==false&&nuyen-inventory[item]["helmmod"]["cost"]>0) {
        turnonhelm (item,$(this))
    } else {
        buysign ($(this));
        inventory[item]["helm"]=false;
        nuyen+=inventory[item]["helmmod"]["cost"];
        inventory[item]["cost"]-=inventory[item]["helmmod"]["cost"];
        costUpdater (item);
        if (inventory[item]["mods"]["chemicalseal"]["active"]==true) {
            invmod=inventory[item]["mods"]["chemicalseal"];
            inventory[item]["capacity"]-=invmod["capacity"];
            nuyen+=invmod["cost"];
            inventory[item]["cost"]-=invmod["cost"];
            invmod["active"]=false;
            buysign ($("."+item+" .chemicalseal .buyarmmod"));
            costUpdater (item);
        }
    }
    nuyenUpdater();
}

function turnonhelm (item,x) {
    sellsign (x);
    inventory[item]["helm"]=true;
    nuyen-=inventory[item]["helmmod"]["cost"];
    inventory[item]["cost"]+=inventory[item]["helmmod"]["cost"];
    costUpdater (item);
}

$( "#clothing" ).on( "change", "input", fashioncost );

var clothingcost=20;//this is the cost of clothing
var electrochromiccost=0;//this is the cost of clothing with electro chromatic
var feedbackcost=0;//this is the cost of clothing with feedback
var synthleathercost=0;//this is the cost of leather clothing

var clothingavail=0;//the avail of the clothing
var clothingarmor=0;//the armor value of the clothing, only effected by leather

function fashioncost() {//this is to help calulate how much cloths cost
    cost=$(this).val();
    if (cost==""||cost<1) {//if clothes value is less then 1, then its cost = 20
        clothingcost=20;
    } else {//else the cost is whatever the input says
        clothingcost=cost;
    }
    fashionprice();//this calulates and renders the cost with the mods that you can add to cloths
}

function fashionprice() {
    $("#clothing .armor").empty().append(clothingarmor);
    $("#clothing .avail").empty().append(clothingavail);
    $("#clothing .cost").empty().append((parseInt(clothingcost)+electrochromiccost+feedbackcost+synthleathercost)+"&yen;");
}

$( "#clothing" ).on( "click", ".button", fashionbutton );

function fashionbutton() {//this will change the value and avail of cloths based off of what buttons are pressed.
    switch ($(this).attr("class")) {
        case ("electrochromic button"):
            electrochromiccost=500;
            fashionactivate ($(this),2);
            break;
        case ("electrochromic button active"):
            electrochromiccost=0;
            fashionDeactivate($(this),2);
            break;
        case ("feedback button"):
            feedbackcost=500;
            fashionactivate($(this),8);
            break;
        case ("feedback button active"):
            feedbackcost=0;
            fashionDeactivate($(this),8);
            break;
        case ("leather button"):
            synthleathercost=200;
            fashionactivate($(this),0);
            clothingarmor=4;
            break;
        case ("leather button active"):
            synthleathercost=0;
            fashionDeactivate($(this),0);
            clothingarmor=0;
            break;
        case ("buycloths button"):
            if (nuyen-(parseInt(clothingcost)+electrochromiccost+feedbackcost+synthleathercost)<0) {
                return;
            }
            inventory["clothing"+invNum]={electrochromic: false, feedback: false, leather: false, armor: clothingarmor, avail: clothingavail, cost:parseInt(clothingcost)+electrochromiccost+feedbackcost+synthleathercost}
            $("#clothing").after("<tr class='clothing"+invNum+"'><td class='sellarmor button'><em>-</em></td><td>"+clothingcost+"&yen;</td><td class='electrochromic'>Electrochromic</td><td class='feedback'>Feedback</td><td class='leather'>Synthleather</td><td>"+clothingarmor+"</td><td>"+clothingavail+"</td><td>"+inventory["clothing"+invNum]["cost"]+"&yen;</td></tr>");
            if (synthleathercost==200) {
                inventory["clothing"+invNum]["leather"]=true;
                clothingmodactive(invNum+" .leather");
            }
            if (feedbackcost==500) {
                inventory["clothing"+invNum]["feedback"]=true;
                clothingmodactive(invNum+" .feedback");
            }
            if (electrochromiccost==500) {
                inventory["clothing"+invNum]["electrochromic"]=true;
                clothingmodactive(invNum+" .electrochromic");
            }
            nuyen-=inventory["clothing"+invNum]["cost"]
            invNum++;
            nuyenUpdater();
            break;
    }
    fashionprice();
    
    function clothingmodactive(x) {
        $(".clothing"+x).addClass("active");
    }
    function fashionactivate(x,y) {
        x.addClass("active");
        clothingavail+=y;
    }
    
    function fashionDeactivate(x,y) {
        x.removeClass("active");
        clothingavail-=y;
    }
}

$(".commlinks").appendTo("#links");//sets the commlink labels
$(".cyberdecks").appendTo("#decks");//sets the cyberdeck labels
$(".rccs").appendTo("#consoles");//sets the RCC labels

for (devicename in electronics) {//this populates the electronic devices
    var device = electronics[devicename];
    switch (device.type) {
        case "commlink":
            $("#links").append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["model"]+"</td><td>"+device["device"]+"</td><td>"+device["avail"]+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "deck":
            $("#decks").append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["model"]+"</td><td>"+device["device"]+"</td><td>"+device["array"]+"</td><td>"+device["programs"]+"</td><td>"+device["avail"]+" "+device["restrict"]+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "rcc":
            $("#consoles").append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["model"]+"</td><td>"+device["device"]+"</td><td>"+device["dataprocess"]+"</td><td>"+device["firewall"]+"</td><td>"+device["avail"]+" "+device["restrict"]+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "accessory":
            $("#eccessories").append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["device"]+"</td><td>"+device["avail"]+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "rfid":
            $('#rfid').append("<tr class='"+devicename+"'><td class='buyUp button'>+</td><td class='numrfid'>0</td><td class='sellDown button'>-</td><td>"+device["name"]+"</td><td>"+device["device"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "communication":
            $('#communications').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td class='ratingUp button'>+</td><td class='commrating'>1</td><td class='ratingDown button'>-</td><td>"+device["name"]+"</td><td class='avail'>"+device["avail"]+" "+device.restrict+"</td><td class='price'>"+device["cost"]+"&yen;</td></tr>");
            if (typeof device.rating==="undefined") {
                $("."+devicename+" .ratingUp,."+devicename+" .ratingDown").addClass("deact");
                $("."+devicename+" .commrating").empty().append("n/a");
            }
            break;
        case "credsticks":
            $('#credsticks').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["maxvalue"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "identification":
            $('#identification').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td class='ratingUp button'>+</td><td class='commrating'>1</td><td class='ratingDown button'>-</td><td>"+device["name"]+" <input type='text' class='fakename' placeholder='For?'"+"</td><td class='avail'>"+device["avail"]+" "+device.restrict+"</td><td class='price'>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "tools":
            $('#tools').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "securitydevice":
            $('#securitydevice').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["rating"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "restraints":
            $('#restraints').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "bnegear":
            $('#bnegear').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["rating"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "chemicals":
            $('#chemicals').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "survivalgear":
            $('#survivalgear').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["rating"]+"</td>><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "grapplegungear":
            $('#grapplegungear').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "biotech":
            $('#biotech').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["rating"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "docwagon":
            $('#docwagon').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
        case "slappatches":
            $('#slappatches').append("<tr class='"+devicename+"'><td class='buydevice button'><strong>+</strong></td><td>"+device["name"]+"</td><td>"+device["rating"]+"</td><td>"+device["avail"]+" "+device.restrict+"</td><td>"+device["cost"]+"&yen;</td></tr>");
            break;
    }
    
    if (device["avail"]>12) {
        $("."+devicename+" .buydevice").addClass("deact").empty().append("-");
    }
}

$("#e-accessories").on("click", ".buyUp, .sellDown", buyinbulk);

function buyinbulk() {//used to buy rfid tags, or possible other items that can be baught like rfid tags
    var rfid = $(this).parent().attr("class");
    if (typeof inventory[rfid]==="undefined") {
        inventory[rfid]=electronics[rfid];
        inventory[rfid]["tagNo"]=0;
    }
    if ($(this).hasClass("buyUp")&&nuyen-inventory[rfid]["cost"]>0) {
        inventory[rfid]["tagNo"]+=10;
        nuyen-=inventory[rfid]["cost"];
    } else if ($(this).hasClass("sellDown")&&inventory[rfid]["tagNo"]>0) {
        inventory[rfid]["tagNo"]-=10;
        nuyen+=inventory[rfid]["cost"];
    }
    tenUp(rfid);
    nuyenUpdater();
    
    function tenUp(x) {
        $("."+x+" .numrfid").empty().append(inventory[x]["tagNo"]);
    }
}

$("#devices, #e-accessories").on("click", ".buydevice", appleStore);

function appleStore () {//this function handles buying electroic devices
    var devicename=$(this).parent().attr("class");
    if ($(this).hasClass("deact")||nuyen-electronics[devicename]["cost"]<0) {
        return;
    }
    toInventory (devicename);
    switch (electronics[devicename]["type"]) {
        case "commlink":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='linkmods' colspan=3></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            $("."+devicename+invNum+" .linkmods").append("<td class='label'>Sim Mod</td><td class='simmod button'>+</td><td class='label'>Hot Sim</td><td class='hotsim button'>+</td>");
            break;
        case "deck":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='programs' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            var localmod = $("."+devicename+invNum+" .programs");
            localmod.append("<tr class='agent'><td class='label'>Agent</td><td class='agentup button'>+</td><td class='agentrating'>0</td><td class='agentdown button'>-</td></tr>");
            for (program in programs) {
                localmod.append("<tr class='"+program+"'><td class='label'>"+programs[program]["name"]+"</td><td class='buyprogram button' colspan=3><strong>+</strong></td></tr>");
            }
            break;
        case "rcc":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='programs' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            var localmod = $("."+devicename+invNum+" .programs");
            for (program in programs) {
                if (programs[program]["rcc"]==true) {
                    localmod.append("<tr class='"+program+"'><td class='label'>"+programs[program]["name"]+"</td><td class='buyprogram button' colspan=3><strong>+</strong></td></tr>");
                }
            }
            break;
        case "accessory":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moddy' colspan=3></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "communication":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
            
        case "credsticks":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=3></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "identification":
            inventory[devicename+invNum]["id"]=$("."+devicename+" .fakename").val();
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=3>"+inventory[devicename+invNum]["rating"]+"</td><td>"+inventory[devicename+invNum]["id"]+"</td><td>"+inventory[devicename+invNum]["avail"]+" "+inventory[devicename+invNum]["restrict"]+"</td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "securitydevice":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "restraints":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "bnegear":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "chemicals":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "survivalgear":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "grapplegungear":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "biotech":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "docwagon":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break;
        case "slappatches":
            $("."+devicename).after("<tr class='"+devicename+invNum+"'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>"+inventory[devicename+invNum]["cost"]+"&yen;</td></tr>");
            break; 
    }
    nuyen-=inventory[devicename+invNum]["cost"];
    invNum++;
    nuyenUpdater();
    
    function toInventory(x) {//this adds the device in to the inventory
        inventory[x+invNum]={};
        for (deviceAtt in electronics[x]) {
            inventory[x+invNum][deviceAtt]=electronics[x][deviceAtt];
        }
        if (electronics[x]["type"]==("rcc"||"deck")) {
            inventory[x+invNum]["programlist"]={};
        }
        
    }
}

$("#devices, #e-accessories").on("click", ".selldevice", microsoftStore);

function microsoftStore() {//this sells the device
    var devicename=$(this).parent().attr("class");
    $("."+devicename).remove();
    nuyen+=inventory[devicename]["cost"];
    delete inventory[devicename];
    nuyenUpdater();
}

$("#devices").on("click", ".programs .button", buyProgram);

function buyProgram() {
    var device=$(this).parent().parent().parent().attr("class");
    var program = $(this).parent().attr("class");
    if (typeof programs[program]!=="undefined") {
        cost=programcost(program);
    }
    if ($(this).hasClass("agentup")) {
        if (typeof inventory[device]["programlist"]["agent"]==="undefined"&&nuyen-1000>0) {
            inventory[device]["programlist"]["agent"]=1;
            nuyen-=1000;
            inventory[device]["cost"]+=1000;
        } else if (inventory[device]["programlist"]["agent"]<4) {
            if (inventory[device]["programlist"]["agent"]<3&&nuyen-1000>0) {
                nuyen-=1000;
                inventory[device]["cost"]+=1000;
            } else if (inventory[device]["programlist"]["agent"]==3&&nuyen-5000>0) {
                nuyen-=5000;
                inventory[device]["cost"]+=5000;
            } else if (inventory[device]["programlist"]["agent"]>=4&&nuyen-2000>0) {
                nuyen-=2000;
                inventory[device]["cost"]+=2000;
            } else {
                inventory[device]["programlist"]["agent"]=0;
            }
            inventory[device]["programlist"]["agent"]++;
            agentupdate(device);
        }
        $("."+device+" .agentrating").empty().append(inventory[device]["programlist"]["agent"])
    } else if ($(this).hasClass("agentdown")) {
        if (inventory[device]["programlist"]["agent"]>0) {
            inventory[device]["programlist"]["agent"]--;
            if (inventory[device]["programlist"]["agent"]<3) {
                nuyen+=1000;
                inventory[device]["cost"]-=1000;
            } else if (inventory[device]["programlist"]["agent"]==3) {
                nuyen+=5000;
                inventory[device]["cost"]-=5000;
            } else if (inventory[device]["programlist"]["agent"]>3) {
                nuyen+=2000;
                inventory[device]["cost"]-=2000;
            }
        }
        agentupdate(device);
    } else if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        delete inventory[device]["programlist"][program];
        nuyen+=cost;
        inventory[device]["cost"]-=cost;
    } else if (nuyen-cost>0) {
        $(this).addClass("active");
        inventory[device]["programlist"][program]=programs[program];
        nuyen-=cost;
        inventory[device]["cost"]+=cost;
    }
    $("."+device+" .devicecost").empty().append(inventory[device]["cost"]+"&yen;");
    nuyenUpdater();
    
    function programcost(x) {
        cost=0;
        if (programs[x]["category"]=="common") {
            cost=80;
        } else {
            cost=250;
        }
        return (cost);
    }
    function agentupdate(x) {
        $("."+x+" .agentrating").empty().append(inventory[x]["programlist"]["agent"])
    }
}


$("#devices").on("click", ".linkmods .button", buylinkmod);

function buylinkmod() {
    var device=$(this).parent().parent().attr("class");
    if ($(this).hasClass("simmod")) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            inventory[device]["programlist"]["simmod"]=false;
            nuyen+=100;
            inventory[device]["cost"]-=100;
            if (inventory[device]["programlist"]["hotsim"]==true) {
                $("."+device+" .hotsim").removeClass("active");
                inventory[device]["programlist"]["hotsim"]=false;
                nuyen+=250;
                inventory[device]["cost"]-=250;
            }
        } else {
            $(this).addClass("active");
            inventory[device]["programlist"]["simmod"]=true;
            nuyen-=100;
            inventory[device]["cost"]+=100;
        }
    } else if ($(this).hasClass("hotsim")) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            inventory[device]["programlist"]["hotsim"]=false;
            nuyen+=250;
            inventory[device]["cost"]-=250;
        } else {
            $(this).addClass("active");
            inventory[device]["programlist"]["hotsim"]=true;
            nuyen-=250;
            inventory[device]["cost"]+=250;
            if (inventory[device]["programlist"]["simmod"]==false||typeof inventory[device]["programlist"]["simmod"]==="undefined") {
                $("."+device+" .simmod").addClass("active");
                inventory[device]["programlist"]["simmod"]=true;
                nuyen-=100;
                inventory[device]["cost"]+=100;
            }
        }
    }
    $("."+device+" .devicecost").empty().append(inventory[device]["cost"]+"&yen;");
    nuyenUpdater();
}

$("#e-accessories").on("click", ".ratingUp, .ratingDown", commRating);//this is for raising and slowing communcation devices ratings

function commRating() {
    if ($(this).hasClass("deact")) {
        return;
    }
    var device=$(this).parent().attr("class");
    var ed=electronics[device];//ed=electronic device
    if ($(this).hasClass("ratingUp")&&ed["avail"]<12&&ed["rating"]<6) {//if this is the rating up button, up the rating of the device
        ed["rating"]++;
        ed["avail"]+=ed["availx"];
        ed.cost+=ed.costx;
    } else if ($(this).hasClass("ratingDown")&&ed["rating"]>1) {//else if this is the rating down device, lower the rating
        ed["rating"]--;
        ed["avail"]-=ed["availx"];
        ed.cost-=ed.costx;
    }
    $("."+device+" .commrating").empty().append(ed["rating"]);
    $("."+device+" .avail").empty().append(ed["avail"]+" "+ed["restrict"]);
    $("."+device+" .price").empty().append(ed["cost"]+"&yen;");
}
