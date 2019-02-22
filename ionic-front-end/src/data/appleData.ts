export interface AppleDistributorModel {
    startDate: string,
    endDate: string,
    origin: string,
    currency: string
}
export const AppleDistributorData: AppleDistributorModel = {
    "startDate": "10/01/2017",
    "endDate": "11/04/2017",
    "origin": "Apple Music",
    "currency": "AUD",
}
export interface AppleTrackModel {
    quantity: string,
    royalty: string,
    royaltyTotal: string,
    item_title:string,
    isrc: string,
    item_artist:string
}
export const AppleTrackData: AppleTrackModel[] =
    [
        {
			"royalty": ".021330",
			"item_title": "Q1.2",
			"royaltyTotal": ".021330",
			"isrc": "DEW259500109",
			"quantity": "1",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "You Come Along",
			"royaltyTotal": ".021330",
			"isrc": "ATK430405101",
			"quantity": "1",
			"item_artist": "Seelenluft"
		},
		{
			"royalty": ".021330",
			"item_title": "Kung Fu Fighting",
			"royaltyTotal": ".021330",
			"isrc": "DEH260404801",
			"quantity": "1",
			"item_artist": "Carl Douglas"
		},
		{
			"royalty": ".021330",
			"item_title": "Kung Fu Fighting",
			"royaltyTotal": ".533250",
			"isrc": "DEH260404806",
			"quantity": "25",
			"item_artist": "Carl Douglas"
		},
		{
			"royalty": ".021330",
			"item_title": "Kung Fu Fighting",
			"royaltyTotal": ".021330",
			"isrc": "DEH260404809",
			"quantity": "1",
			"item_artist": "Carl Douglas"
		},
		{
			"royalty": ".021330",
			"item_title": "New Day Dub",
			"royaltyTotal": ".063990",
			"isrc": "DEW259900304",
			"quantity": "3",
			"item_artist": "Round Two"
		},
		{
			"royalty": ".021330",
			"item_title": "No Partial",
			"royaltyTotal": ".085320",
			"isrc": "DEW250100600",
			"quantity": "4",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "Green Cloud",
			"royaltyTotal": ".021330",
			"isrc": "DEU380300002",
			"quantity": "1",
			"item_artist": "Saafi Brothers"
		},
		{
			"royalty": ".021330",
			"item_title": "Seven Horizons",
			"royaltyTotal": ".021330",
			"isrc": "DEU380300003",
			"quantity": "1",
			"item_artist": "Saafi Brothers"
		},
		{
			"royalty": ".021330",
			"item_title": "Lovin` Music",
			"royaltyTotal": ".021330",
			"isrc": "DEU380300009",
			"quantity": "1",
			"item_artist": "Saafi Brothers"
		},
		{
			"royalty": ".021330",
			"item_title": "Metapop (feat. Dea Li)",
			"royaltyTotal": ".021330",
			"isrc": "DEU380300010",
			"quantity": "1",
			"item_artist": "Saafi Brothers"
		},
		{
			"royalty": ".021330",
			"item_title": "Sun and Water",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650509912",
			"quantity": "1",
			"item_artist": "Floating Clouds"
		},
		{
			"royalty": ".021330",
			"item_title": "Wellness Feeling @ St. tropez",
			"royaltyTotal": ".042660",
			"isrc": "DEZ650510212",
			"quantity": "2",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Ibiza Sun (Get Down)",
			"royaltyTotal": ".063990",
			"isrc": "DEZ650510213",
			"quantity": "3",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Bali Chill Groove",
			"royaltyTotal": ".085320",
			"isrc": "DEZ650510214",
			"quantity": "4",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Mykonos Sundown Feelings",
			"royaltyTotal": ".042660",
			"isrc": "DEZ650510215",
			"quantity": "2",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Da Sun Is Gone @ Copa Copana",
			"royaltyTotal": ".042660",
			"isrc": "DEZ650510216",
			"quantity": "2",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Rimini Chill (Lost In Paradise)",
			"royaltyTotal": ".063990",
			"isrc": "DEZ650510217",
			"quantity": "3",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Relaxing Hawaii (Sun and Water)",
			"royaltyTotal": ".042660",
			"isrc": "DEZ650510218",
			"quantity": "2",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Goa Jam (Indian Summer)",
			"royaltyTotal": ".042660",
			"isrc": "DEZ650510219",
			"quantity": "2",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Koh Phagan (Time of Passion)",
			"royaltyTotal": ".063990",
			"isrc": "DEZ650510220",
			"quantity": "3",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Gran Canaria Sunset Session",
			"royaltyTotal": ".063990",
			"isrc": "DEZ650510221",
			"quantity": "3",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Mauritius I C U Again",
			"royaltyTotal": ".042660",
			"isrc": "DEZ650510222",
			"quantity": "2",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "Isla Margerita",
			"royaltyTotal": ".042660",
			"isrc": "DEZ650510223",
			"quantity": "2",
			"item_artist": "Islands of Chill"
		},
		{
			"royalty": ".021330",
			"item_title": "La Guitarra",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650510292",
			"quantity": "1",
			"item_artist": "In Credo"
		},
		{
			"royalty": ".021330",
			"item_title": "New Bibi-Hendl (Rap)",
			"royaltyTotal": ".149310",
			"isrc": "DEF550000573",
			"quantity": "7",
			"item_artist": "Takeo Ischi"
		},
		{
			"royalty": ".021330",
			"item_title": "Sunshine",
			"royaltyTotal": ".021330",
			"isrc": "GBEEK0400086",
			"quantity": "1",
			"item_artist": "Verna Francis"
		},
		{
			"royalty": ".021330",
			"item_title": "Stranger",
			"royaltyTotal": ".298620",
			"isrc": "DEW250201003",
			"quantity": "14",
			"item_artist": "Love Joys"
		},
		{
			"royalty": ".021330",
			"item_title": "Feel It Dub",
			"royaltyTotal": ".042660",
			"isrc": "DEW250201058",
			"quantity": "2",
			"item_artist": "Wackies"
		},
		{
			"royalty": ".021330",
			"item_title": "Good Thing Going",
			"royaltyTotal": ".042660",
			"isrc": "DEW250201067",
			"quantity": "2",
			"item_artist": "Sugar Minott"
		},
		{
			"royalty": ".021330",
			"item_title": "Wackie Rock Tune",
			"royaltyTotal": ".021330",
			"isrc": "DEW250301127",
			"quantity": "1",
			"item_artist": "Wackies"
		},
		{
			"royalty": ".021330",
			"item_title": "Brimstone & Fire",
			"royaltyTotal": ".319950",
			"isrc": "DEW250401168",
			"quantity": "15",
			"item_artist": "Wayne Jarrett"
		},
		{
			"royalty": ".021330",
			"item_title": "International Herb",
			"royaltyTotal": ".255960",
			"isrc": "DEW250501204",
			"quantity": "12",
			"item_artist": "Sugar Minott"
		},
		{
			"royalty": ".021330",
			"item_title": "Tribesman Dub",
			"royaltyTotal": ".021330",
			"isrc": "DEW250501221",
			"quantity": "1",
			"item_artist": "Prince Douglas"
		},
		{
			"royalty": ".021330",
			"item_title": "White Noise",
			"royaltyTotal": ".021330",
			"isrc": "ATK430507601",
			"quantity": "1",
			"item_artist": "Sofa Surfers"
		},
		{
			"royalty": ".021330",
			"item_title": "Jumanji",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650518042",
			"quantity": "1",
			"item_artist": "African Vibes"
		},
		{
			"royalty": ".021330",
			"item_title": "Mysteria",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650518047",
			"quantity": "1",
			"item_artist": "Djibooti"
		},
		{
			"royalty": ".021330",
			"item_title": "Manila (Headman Mix)",
			"royaltyTotal": ".405270",
			"isrc": "ATK430203904",
			"quantity": "19",
			"item_artist": "Seelenluft"
		},
		{
			"royalty": ".021330",
			"item_title": "Manila (Ewan Pearson Mix)",
			"royaltyTotal": ".042660",
			"isrc": "ATK430303401",
			"quantity": "2",
			"item_artist": "Seelenluft"
		},
		{
			"royalty": ".021330",
			"item_title": "Prelude - Intro",
			"royaltyTotal": ".042660",
			"isrc": "DECN60500001",
			"quantity": "2",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Recreation",
			"royaltyTotal": ".042660",
			"isrc": "DECN60500002",
			"quantity": "2",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Bay of Islands",
			"royaltyTotal": ".042660",
			"isrc": "DECN60500003",
			"quantity": "2",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Unending",
			"royaltyTotal": ".021330",
			"isrc": "DECN60500004",
			"quantity": "1",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Night Train",
			"royaltyTotal": ".021330",
			"isrc": "DECN60500005",
			"quantity": "1",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Moment to Moment",
			"royaltyTotal": ".042660",
			"isrc": "DECN60500006",
			"quantity": "2",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Sea Traffic",
			"royaltyTotal": ".085320",
			"isrc": "DECN60500007",
			"quantity": "4",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Sea Traffic",
			"royaltyTotal": ".021330",
			"isrc": "DECN60500007",
			"quantity": "1",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Insight",
			"royaltyTotal": ".042660",
			"isrc": "DECN60500008",
			"quantity": "2",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Sonar",
			"royaltyTotal": ".042660",
			"isrc": "DECN60500009",
			"quantity": "2",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Empty",
			"royaltyTotal": ".021330",
			"isrc": "DECN60500010",
			"quantity": "1",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Pole Navigation",
			"royaltyTotal": ".042660",
			"isrc": "DECN60500011",
			"quantity": "2",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Unbreakable",
			"royaltyTotal": ".042660",
			"isrc": "DECN60500012",
			"quantity": "2",
			"item_artist": "Blackfish"
		},
		{
			"royalty": ".021330",
			"item_title": "Je Pense À Toi",
			"royaltyTotal": ".021330",
			"isrc": "DEX050500011",
			"quantity": "1",
			"item_artist": "French Affair"
		},
		{
			"royalty": ".021330",
			"item_title": "Dub Unlimited",
			"royaltyTotal": ".021330",
			"isrc": "DEW250501236",
			"quantity": "1",
			"item_artist": "Bullwackie's All Stars"
		},
		{
			"royalty": ".021330",
			"item_title": "Dubbing Around",
			"royaltyTotal": ".021330",
			"isrc": "DEW250501240",
			"quantity": "1",
			"item_artist": "Bullwackie's All Stars"
		},
		{
			"royalty": ".021330",
			"item_title": "Girlfriend (Featuring Sexy Sushi)",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650600941",
			"quantity": "1",
			"item_artist": "Näd Mika"
		},
		{
			"royalty": ".021330",
			"item_title": "Beneath an Evening Sky",
			"royaltyTotal": ".021330",
			"isrc": "DEF300000002",
			"quantity": "1",
			"item_artist": "Oregon"
		},
		{
			"royalty": ".021330",
			"item_title": "Fuck Me",
			"royaltyTotal": ".042660",
			"isrc": "SEVMN0600701",
			"quantity": "2",
			"item_artist": "Black Magik"
		},
		{
			"royalty": ".021330",
			"item_title": "Good Collie Weed",
			"royaltyTotal": ".021330",
			"isrc": "DEW250601242",
			"quantity": "1",
			"item_artist": "John Clarke"
		},
		{
			"royalty": ".021330",
			"item_title": "Mein Papa bewacht die BVG",
			"royaltyTotal": ".021330",
			"isrc": "DES870210612",
			"quantity": "1",
			"item_artist": "Terrorgruppe"
		},
		{
			"royalty": ".021330",
			"item_title": "Dicke Deutsche fahren mit dem Wochenendticket in die Hauptstadt",
			"royaltyTotal": ".021330",
			"isrc": "DES870210618",
			"quantity": "1",
			"item_artist": "Terrorgruppe"
		},
		{
			"royalty": ".021330",
			"item_title": "The Charleston",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600957",
			"quantity": "1",
			"item_artist": "Paul Whiteman"
		},
		{
			"royalty": ".021330",
			"item_title": "Let's All Go to Mary's House",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600546",
			"quantity": "1",
			"item_artist": "Savoy Orpheans"
		},
		{
			"royalty": ".021330",
			"item_title": "Who?",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0601175",
			"quantity": "1",
			"item_artist": "Binnie Hale"
		},
		{
			"royalty": ".021330",
			"item_title": "Where's That Rainbow?",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0601169",
			"quantity": "1",
			"item_artist": "Dorothy Dickson"
		},
		{
			"royalty": ".021330",
			"item_title": "Good Little, Bad Little You",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600295",
			"quantity": "1",
			"item_artist": "Cliff \"Ukulele Ike\" Edwards"
		},
		{
			"royalty": ".021330",
			"item_title": "I Wanna Be Loved By You",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600398",
			"quantity": "1",
			"item_artist": "Helen Kane"
		},
		{
			"royalty": ".021330",
			"item_title": "Free for All (Soundstream Remix)",
			"royaltyTotal": ".021330",
			"isrc": "DEW250600441",
			"quantity": "1",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "Piece of Ganja",
			"royaltyTotal": ".021330",
			"isrc": "DEDR80600018",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "Piece of Ganja",
			"royaltyTotal": ".191970",
			"isrc": "DEDR80600018",
			"quantity": "9",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "Back for Good",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650602364",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "Back for Good",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650602364",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "In the Jungle",
			"royaltyTotal": ".042660",
			"isrc": "DEDR80600020",
			"quantity": "2",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "In the Jungle",
			"royaltyTotal": ".021330",
			"isrc": "DEDR80600020",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "Music Is Life",
			"royaltyTotal": ".021330",
			"isrc": "DEDR80600022",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "Music Is Life",
			"royaltyTotal": ".021330",
			"isrc": "DEDR80600022",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "King of Kings",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650602413",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "Got to Be Concious",
			"royaltyTotal": ".021330",
			"isrc": "DEA610500264",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "Sensimillia Fi Bun",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650602345",
			"quantity": "1",
			"item_artist": "Elijah Prophet, DYCR"
		},
		{
			"royalty": ".021330",
			"item_title": "Sensimillia Fi Bun",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650602345",
			"quantity": "1",
			"item_artist": "Elijah Prophet, DYCR"
		},
		{
			"royalty": ".021330",
			"item_title": "Mother Nature",
			"royaltyTotal": ".021330",
			"isrc": "DEDR80600026",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "Mother Nature",
			"royaltyTotal": ".021330",
			"isrc": "DEDR80600026",
			"quantity": "1",
			"item_artist": "Elijah Prophet"
		},
		{
			"royalty": ".021330",
			"item_title": "Lovelee Dae (20:20 Vision Remix)",
			"royaltyTotal": ".021330",
			"isrc": "DEL220212247",
			"quantity": "1",
			"item_artist": "Blaze"
		},
		{
			"royalty": ".021330",
			"item_title": "Rhythm Is Our Business",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600775",
			"quantity": "1",
			"item_artist": "Jimmie Lunceford"
		},
		{
			"royalty": ".021330",
			"item_title": "The Girl Who Loves a Soldier",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600970",
			"quantity": "1",
			"item_artist": "Leon Cortez"
		},
		{
			"royalty": ".021330",
			"item_title": "Run, Rabbit, Run",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600792",
			"quantity": "1",
			"item_artist": "Flanagan & Allen"
		},
		{
			"royalty": ".021330",
			"item_title": "Run, Rabbit, Run",
			"royaltyTotal": ".426600",
			"isrc": "GBKYB0600792",
			"quantity": "20",
			"item_artist": "Flanagan & Allen"
		},
		{
			"royalty": ".021330",
			"item_title": "The Bombardier Song",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600950",
			"quantity": "1",
			"item_artist": "Bing Crosby"
		},
		{
			"royalty": ".021330",
			"item_title": "Commando Patrol",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600170",
			"quantity": "1",
			"item_artist": "RAF Dance Orchestra"
		},
		{
			"royalty": ".021330",
			"item_title": "I'm Saving a Dime (Out of Every Dollar)",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600442",
			"quantity": "1",
			"item_artist": "Bing Crosby"
		},
		{
			"royalty": ".021330",
			"item_title": "Lilli Marlene",
			"royaltyTotal": ".021330",
			"isrc": "GBKYB0600562",
			"quantity": "1",
			"item_artist": "Marlene Dietrich"
		},
		{
			"royalty": ".021330",
			"item_title": "Taumel",
			"royaltyTotal": ".085320",
			"isrc": "DEZ650602960",
			"quantity": "4",
			"item_artist": "Stoa"
		},
		{
			"royalty": ".021330",
			"item_title": "For Better Moments",
			"royaltyTotal": ".021330",
			"isrc": "DEH330600503",
			"quantity": "1",
			"item_artist": "Chilling Crew"
		},
		{
			"royalty": ".021330",
			"item_title": "Marilyn",
			"royaltyTotal": ".021330",
			"isrc": "DES870612205",
			"quantity": "1",
			"item_artist": "Terrorgruppe"
		},
		{
			"royalty": ".021330",
			"item_title": "Jump Jive An' Wail",
			"royaltyTotal": ".042660",
			"isrc": "DEU970600619",
			"quantity": "2",
			"item_artist": "Boppin' B"
		},
		{
			"royalty": ".021330",
			"item_title": "Sexy",
			"royaltyTotal": ".063990",
			"isrc": "DEX050600040",
			"quantity": "3",
			"item_artist": "French Affair"
		},
		{
			"royalty": ".021330",
			"item_title": "Sounds Like a Melody",
			"royaltyTotal": ".042660",
			"isrc": "DEZ650600862",
			"quantity": "2",
			"item_artist": "Alphaville"
		},
		{
			"royalty": ".021330",
			"item_title": "Guardian Angel",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650600863",
			"quantity": "1",
			"item_artist": "Alphaville"
		},
		{
			"royalty": ".021330",
			"item_title": "Apollo",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650600873",
			"quantity": "1",
			"item_artist": "Alphaville"
		},
		{
			"royalty": ".021330",
			"item_title": "A Day In the Life of a Fool",
			"royaltyTotal": ".021330",
			"isrc": "DEY500600004",
			"quantity": "1",
			"item_artist": "Mark Chesnutt"
		},
		{
			"royalty": ".021330",
			"item_title": "Goodbye Comes Hard for Me",
			"royaltyTotal": ".021330",
			"isrc": "DEY500600008",
			"quantity": "1",
			"item_artist": "Mark Chesnutt"
		},
		{
			"royalty": ".021330",
			"item_title": "Hope / Scope",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650610408",
			"quantity": "1",
			"item_artist": "David Murray"
		},
		{
			"royalty": ".021330",
			"item_title": "Find Out Who Your Friends Are",
			"royaltyTotal": ".042660",
			"isrc": "DEY500600010",
			"quantity": "2",
			"item_artist": "Tracy Lawrence"
		},
		{
			"royalty": ".021330",
			"item_title": "You Can't Hide Redneck",
			"royaltyTotal": ".021330",
			"isrc": "DEY500600012",
			"quantity": "1",
			"item_artist": "Tracy Lawrence"
		},
		{
			"royalty": ".021330",
			"item_title": "Til I Was a Daddy Too",
			"royaltyTotal": ".042660",
			"isrc": "DEY500600017",
			"quantity": "2",
			"item_artist": "Tracy Lawrence"
		},
		{
			"royalty": ".021330",
			"item_title": "The Look",
			"royaltyTotal": ".042660",
			"isrc": "DEU970600546",
			"quantity": "2",
			"item_artist": "Boppin' B"
		},
		{
			"royalty": ".021330",
			"item_title": "I Loose My Mind",
			"royaltyTotal": ".021330",
			"isrc": "DEH330600668",
			"quantity": "1",
			"item_artist": "Brain 19"
		},
		{
			"royalty": ".021330",
			"item_title": "Let the Sunshine In",
			"royaltyTotal": ".298620",
			"isrc": "DEW250601279",
			"quantity": "14",
			"item_artist": "Milton Henry"
		},
		{
			"royalty": ".021330",
			"item_title": "King In My Empire (With Cornel Campbell)",
			"royaltyTotal": ".042660",
			"isrc": "DEW250300410",
			"quantity": "2",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "King In My Empire (With Cornel Campbell)",
			"royaltyTotal": ".021330",
			"isrc": "DEW250300410",
			"quantity": "1",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "Queen In My Empire (With Jennifer Lara)",
			"royaltyTotal": ".042660",
			"isrc": "DEW250300411",
			"quantity": "2",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "Queen In My Empire (With Jennifer Lara)",
			"royaltyTotal": ".021330",
			"isrc": "DEW250300411",
			"quantity": "1",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "Jah Rule (With Paul St. Hilaire)",
			"royaltyTotal": ".063990",
			"isrc": "DEW250300412",
			"quantity": "3",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "We Been Troddin' (With Shalom)",
			"royaltyTotal": ".063990",
			"isrc": "DEW250300413",
			"quantity": "3",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "Mash Down Babylon (With the Chosen Brothers)",
			"royaltyTotal": ".042660",
			"isrc": "DEW250300414",
			"quantity": "2",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "Music Hit You (With Jah Batta)",
			"royaltyTotal": ".021330",
			"isrc": "DEW250300415",
			"quantity": "1",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "Best Friend (With Love Joy)",
			"royaltyTotal": ".021330",
			"isrc": "DEW250300416",
			"quantity": "1",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "Making History (With the Chosen Brothers)",
			"royaltyTotal": ".021330",
			"isrc": "DEW250300417",
			"quantity": "1",
			"item_artist": "Rhythm & Sound"
		},
		{
			"royalty": ".021330",
			"item_title": "It's Got to Be Perfect",
			"royaltyTotal": ".021330",
			"isrc": "DEU970600583",
			"quantity": "1",
			"item_artist": "Boppin' B"
		},
		{
			"royalty": ".021330",
			"item_title": "Lyrica Volcanica (Dub Mix)",
			"royaltyTotal": ".021330",
			"isrc": "DEH260631210",
			"quantity": "1",
			"item_artist": "Up, Bustle & Out"
		},
		{
			"royalty": ".021330",
			"item_title": "Tinto Tintero",
			"royaltyTotal": ".021330",
			"isrc": "DEH260631211",
			"quantity": "1",
			"item_artist": "Up, Bustle & Out"
		},
		{
			"royalty": ".021330",
			"item_title": "Altered Future",
			"royaltyTotal": ".021330",
			"isrc": "GBBAQ9980501",
			"quantity": "1",
			"item_artist": "Saafi Brothers"
		},
		{
			"royalty": ".021330",
			"item_title": "Into States of Consciousness",
			"royaltyTotal": ".021330",
			"isrc": "GBBAQ9980502",
			"quantity": "1",
			"item_artist": "Saafi Brothers"
		},
		{
			"royalty": ".021330",
			"item_title": "Mystical Chants",
			"royaltyTotal": ".021330",
			"isrc": "GBBAQ9980505",
			"quantity": "1",
			"item_artist": "Saafi Brothers"
		},
		{
			"royalty": ".021330",
			"item_title": "The Deep, Pt. 1",
			"royaltyTotal": ".021330",
			"isrc": "GBBAQ9980507",
			"quantity": "1",
			"item_artist": "Saafi Brothers"
		},
		{
			"royalty": ".021330",
			"item_title": "Falling Up (Carl Craig Remix)",
			"royaltyTotal": ".021330",
			"isrc": "GBGXG0500063",
			"quantity": "1",
			"item_artist": "Theo Parrish"
		},
		{
			"royalty": ".021330",
			"item_title": "So Called Friend",
			"royaltyTotal": ".042660",
			"isrc": "DEY500700007",
			"quantity": "2",
			"item_artist": "Danni Leigh"
		},
		{
			"royalty": ".021330",
			"item_title": "Beautiful",
			"royaltyTotal": ".042660",
			"isrc": "ATM960400002",
			"quantity": "2",
			"item_artist": "Julia Crane"
		},
		{
			"royalty": ".021330",
			"item_title": "Lass uns schmutzig Liebe machen",
			"royaltyTotal": ".042660",
			"isrc": "DEA629441180",
			"quantity": "2",
			"item_artist": "Die Schröders"
		},
		{
			"royalty": ".021330",
			"item_title": "Smuggling Weed",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650602442",
			"quantity": "1",
			"item_artist": "Teacha Dee"
		},
		{
			"royalty": ".021330",
			"item_title": "One",
			"royaltyTotal": ".063990",
			"isrc": "DEGD30500149",
			"quantity": "3",
			"item_artist": "Jay-Roc"
		},
		{
			"royalty": ".021330",
			"item_title": "The Floor Is Yours",
			"royaltyTotal": ".021330",
			"isrc": "DEGD30500137",
			"quantity": "1",
			"item_artist": "DJ Nas'D"
		},
		{
			"royalty": ".021330",
			"item_title": "You Gotta Feed Da Funk",
			"royaltyTotal": ".170640",
			"isrc": "DEGD30500150",
			"quantity": "8",
			"item_artist": "Hawkeye"
		},
		{
			"royalty": ".021330",
			"item_title": "Wanna Party With Me",
			"royaltyTotal": ".021330",
			"isrc": "DEGD30500158",
			"quantity": "1",
			"item_artist": "Esone"
		},
		{
			"royalty": ".021330",
			"item_title": "Jammin' With the Crew",
			"royaltyTotal": ".021330",
			"isrc": "DEGD30500160",
			"quantity": "1",
			"item_artist": "Dominance Crushing Crew"
		},
		{
			"royalty": ".021330",
			"item_title": "Love Groove",
			"royaltyTotal": ".021330",
			"isrc": "DEGD30500161",
			"quantity": "1",
			"item_artist": "Reeno"
		},
		{
			"royalty": ".021330",
			"item_title": "Islands of Memories",
			"royaltyTotal": ".021330",
			"isrc": "DEH330601815",
			"quantity": "1",
			"item_artist": "Paradise Blue"
		},
		{
			"royalty": ".021330",
			"item_title": "Fast Car",
			"royaltyTotal": ".021330",
			"isrc": "DEY500700037",
			"quantity": "1",
			"item_artist": "The Wilkinsons"
		},
		{
			"royalty": ".021330",
			"item_title": "Fast Car",
			"royaltyTotal": ".149310",
			"isrc": "DEY500700037",
			"quantity": "7",
			"item_artist": "The Wilkinsons"
		},
		{
			"royalty": ".021330",
			"item_title": "Come On and Stand Up",
			"royaltyTotal": ".021330",
			"isrc": "DEGD30600180",
			"quantity": "1",
			"item_artist": "DJ Nas'D"
		},
		{
			"royalty": ".021330",
			"item_title": "Taken from the Street",
			"royaltyTotal": ".063990",
			"isrc": "DEGD30600167",
			"quantity": "3",
			"item_artist": "DJ Nas'D"
		},
		{
			"royalty": ".021330",
			"item_title": "Crewlife (For My Crew Nasty Stylistix) [feat. Spunk]",
			"royaltyTotal": ".042660",
			"isrc": "DEGD30600181",
			"quantity": "2",
			"item_artist": "DJ Nas'D feat. Spunk"
		},
		{
			"royalty": ".021330",
			"item_title": "Move On This",
			"royaltyTotal": ".021330",
			"isrc": "DEGD30600183",
			"quantity": "1",
			"item_artist": "DJ Nas'D"
		},
		{
			"royalty": ".021330",
			"item_title": "Wenn Du Tanzt (feat. Clueso)",
			"royaltyTotal": ".021330",
			"isrc": "DEGD30600184",
			"quantity": "1",
			"item_artist": "DJ Nas'D feat. Clueso"
		},
		{
			"royalty": ".021330",
			"item_title": "Blockparty",
			"royaltyTotal": ".085320",
			"isrc": "DEGD30600185",
			"quantity": "4",
			"item_artist": "DJ Nas'D"
		},
		{
			"royalty": ".021330",
			"item_title": "Cruisin' Like Michael",
			"royaltyTotal": ".042660",
			"isrc": "DEGD30600186",
			"quantity": "2",
			"item_artist": "DJ Nas'D"
		},
		{
			"royalty": ".021330",
			"item_title": "Definition of Funk",
			"royaltyTotal": ".042660",
			"isrc": "DEGD30600187",
			"quantity": "2",
			"item_artist": "DJ Nas'D"
		},
		{
			"royalty": ".021330",
			"item_title": "Sun and Water",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650510163",
			"quantity": "1",
			"item_artist": "Floating Clouds"
		},
		{
			"royalty": ".021330",
			"item_title": "Try to Forget (Radio-Forg-Edit)",
			"royaltyTotal": ".042660",
			"isrc": "DEQ470700022",
			"quantity": "2",
			"item_artist": "De/Vision"
		},
		{
			"royalty": ".021330",
			"item_title": "R.U.H.R.P.O.T.T.",
			"royaltyTotal": ".021330",
			"isrc": "DECL50700021",
			"quantity": "1",
			"item_artist": "Snaga & Pillath"
		},
		{
			"royalty": ".021330",
			"item_title": "Trust You (single Version)",
			"royaltyTotal": ".042660",
			"isrc": "DEQ470700026",
			"quantity": "2",
			"item_artist": "Mesh"
		},
		{
			"royalty": ".021330",
			"item_title": "With a Song In My Heart",
			"royaltyTotal": ".021330",
			"isrc": "DEE289582107",
			"quantity": "1",
			"item_artist": "Metropole Orchestra"
		},
		{
			"royalty": ".021330",
			"item_title": "Come Sunday",
			"royaltyTotal": ".021330",
			"isrc": "DEE289581507",
			"quantity": "1",
			"item_artist": "Metropole Orchestra"
		},
		{
			"royalty": ".021330",
			"item_title": "The Last Blues",
			"royaltyTotal": ".021330",
			"isrc": "DEE289780101",
			"quantity": "1",
			"item_artist": "Thilo Wolf Trio feat. Randy Brecker, Chuck Loeb, New York Strings"
		},
		{
			"royalty": ".021330",
			"item_title": "The First Step",
			"royaltyTotal": ".021330",
			"isrc": "DEE289780108",
			"quantity": "1",
			"item_artist": "Thilo Wolf Trio feat. Randy Brecker, Chuck Loeb, New York Strings"
		},
		{
			"royalty": ".021330",
			"item_title": "Days in Paris",
			"royaltyTotal": ".021330",
			"isrc": "DEE289780110",
			"quantity": "1",
			"item_artist": "Thilo Wolf Trio feat. Randy Brecker, Chuck Loeb, New York Strings"
		},
		{
			"royalty": ".021330",
			"item_title": "Saturn",
			"royaltyTotal": ".042660",
			"isrc": "NZME00700015",
			"quantity": "2",
			"item_artist": "The Politik"
		},
		{
			"royalty": ".021330",
			"item_title": "The Song Is You",
			"royaltyTotal": ".021330",
			"isrc": "DEE289578106",
			"quantity": "1",
			"item_artist": "Metropole Orchestra"
		},
		{
			"royalty": ".021330",
			"item_title": "Remembering Henri",
			"royaltyTotal": ".021330",
			"isrc": "DEE289578107",
			"quantity": "1",
			"item_artist": "Metropole Orchestra"
		},
		{
			"royalty": ".021330",
			"item_title": "Yesterdays",
			"royaltyTotal": ".021330",
			"isrc": "DEE289578205",
			"quantity": "1",
			"item_artist": "Metropole Orchestra"
		},
		{
			"royalty": ".021330",
			"item_title": "Falling Grace",
			"royaltyTotal": ".021330",
			"isrc": "DEE280438210",
			"quantity": "1",
			"item_artist": "Triosence"
		},
		{
			"royalty": ".021330",
			"item_title": "My Jamaican Girl",
			"royaltyTotal": ".021330",
			"isrc": "GBDQZ0500095",
			"quantity": "1",
			"item_artist": "The Gaylads, B.B. Seaton"
		},
		{
			"royalty": ".021330",
			"item_title": "Sofa Rockers",
			"royaltyTotal": ".106650",
			"isrc": "ATK439700409",
			"quantity": "5",
			"item_artist": "Sofa Surfers"
		},
		{
			"royalty": ".021330",
			"item_title": "Sofa Rockers",
			"royaltyTotal": ".426600",
			"isrc": "ATK439700409",
			"quantity": "20",
			"item_artist": "Sofa Surfers"
		},
		{
			"royalty": ".021330",
			"item_title": "Theatre of the Damned",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650707084",
			"quantity": "1",
			"item_artist": "Blitzkrieg"
		},
		{
			"royalty": ".021330",
			"item_title": "Only a Dream Away",
			"royaltyTotal": ".021330",
			"isrc": "DEE289730404",
			"quantity": "1",
			"item_artist": "George Robert & Phil Woods"
		},
		{
			"royalty": ".021330",
			"item_title": "Time Was",
			"royaltyTotal": ".021330",
			"isrc": "DEE289730407",
			"quantity": "1",
			"item_artist": "George Robert & Phil Woods"
		},
		{
			"royalty": ".021330",
			"item_title": "Ain't Misbehavin'",
			"royaltyTotal": ".021330",
			"isrc": "DEE289242902",
			"quantity": "1",
			"item_artist": "Barbara Morrison"
		},
		{
			"royalty": ".021330",
			"item_title": "Limpin",
			"royaltyTotal": ".021330",
			"isrc": "SEVMN0701701",
			"quantity": "1",
			"item_artist": "Pierre Deutschmann"
		},
		{
			"royalty": ".021330",
			"item_title": "Sofa Rockers (Richard Dorfmeister Remix)",
			"royaltyTotal": ".021330",
			"isrc": "ATK439700401",
			"quantity": "1",
			"item_artist": "Sofa Surfers"
		},
		{
			"royalty": ".021330",
			"item_title": "Where Do You Go to (My Lovely)",
			"royaltyTotal": ".106650",
			"isrc": "GBLKJ0800014",
			"quantity": "5",
			"item_artist": "Peter Sarstedt"
		},
		{
			"royalty": ".021330",
			"item_title": "Gamma Ray",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650714394",
			"quantity": "1",
			"item_artist": "Birth Control"
		},
		{
			"royalty": ".021330",
			"item_title": "So We Love It",
			"royaltyTotal": ".021330",
			"isrc": "DEW250701301",
			"quantity": "1",
			"item_artist": "Sugar Minott"
		},
		{
			"royalty": ".021330",
			"item_title": "Life Gets Better",
			"royaltyTotal": ".042660",
			"isrc": "GBFNF0700029",
			"quantity": "2",
			"item_artist": "Skool of Thought, Ed Solo & Skool of Thought, Ed Solo"
		},
		{
			"royalty": ".021330",
			"item_title": "Life Gets Better",
			"royaltyTotal": ".021330",
			"isrc": "GBFNF0700029",
			"quantity": "1",
			"item_artist": "Skool of Thought, Ed Solo & Skool of Thought, Ed Solo"
		},
		{
			"royalty": ".021330",
			"item_title": "Allthegirls",
			"royaltyTotal": ".021330",
			"isrc": "DEGL60700040",
			"quantity": "1",
			"item_artist": "Siriusmo"
		},
		{
			"royalty": ".021330",
			"item_title": "Allthegirls (Reprise)",
			"royaltyTotal": ".021330",
			"isrc": "DEGL60700041",
			"quantity": "1",
			"item_artist": "Siriusmo"
		},
		{
			"royalty": ".021330",
			"item_title": "Girlsrock",
			"royaltyTotal": ".021330",
			"isrc": "DEGL60700042",
			"quantity": "1",
			"item_artist": "Siriusmo"
		},
		{
			"royalty": ".021330",
			"item_title": "Femuscle",
			"royaltyTotal": ".021330",
			"isrc": "DEGL60700044",
			"quantity": "1",
			"item_artist": "Siriusmo"
		},
		{
			"royalty": ".021330",
			"item_title": "Outro",
			"royaltyTotal": ".021330",
			"isrc": "DEGL60700045",
			"quantity": "1",
			"item_artist": "Siriusmo"
		},
		{
			"royalty": ".021330",
			"item_title": "Siesta Del Sol",
			"royaltyTotal": ".277290",
			"isrc": "DEZ650510511",
			"quantity": "13",
			"item_artist": "In Credo"
		},
		{
			"royalty": ".021330",
			"item_title": "Wherever I Go",
			"royaltyTotal": ".021330",
			"isrc": "DEH330601779",
			"quantity": "1",
			"item_artist": "The Man Behind C."
		},
		{
			"royalty": ".021330",
			"item_title": "The Anthem",
			"royaltyTotal": ".063990",
			"isrc": "FR2VZ9900113",
			"quantity": "3",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "Relax In Mui Ne",
			"royaltyTotal": ".042660",
			"isrc": "FR2VZ9900115",
			"quantity": "2",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "Last Tango in Saigon",
			"royaltyTotal": ".042660",
			"isrc": "FR2VZ9900118",
			"quantity": "2",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "I Wanna Go Back",
			"royaltyTotal": ".063990",
			"isrc": "FR2VZ9900120",
			"quantity": "3",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "Full Backpack",
			"royaltyTotal": ".021330",
			"isrc": "FR2VZ9900121",
			"quantity": "1",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "War",
			"royaltyTotal": ".021330",
			"isrc": "FR2VZ9900122",
			"quantity": "1",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "Lesson With the Master",
			"royaltyTotal": ".021330",
			"isrc": "FR2VZ9900123",
			"quantity": "1",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "Dark Sea",
			"royaltyTotal": ".021330",
			"isrc": "FR2VZ9900124",
			"quantity": "1",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "Welcome to Viet Nam",
			"royaltyTotal": ".042660",
			"isrc": "FR2VZ9900128",
			"quantity": "2",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "Hope",
			"royaltyTotal": ".042660",
			"isrc": "FR2VZ9900143",
			"quantity": "2",
			"item_artist": "Onra"
		},
		{
			"royalty": ".021330",
			"item_title": "Frieden Dir Jerusalem",
			"royaltyTotal": ".042660",
			"isrc": "DEAF40800151",
			"quantity": "2",
			"item_artist": "Andrea Adams-Frey"
		},
		{
			"royalty": ".021330",
			"item_title": "Wünsche Mit Mir Israel Shalom",
			"royaltyTotal": ".042660",
			"isrc": "DEAF40800152",
			"quantity": "2",
			"item_artist": "Cae Gauntt; Eberhard Rink"
		},
		{
			"royalty": ".021330",
			"item_title": "Jerushalaim",
			"royaltyTotal": ".042660",
			"isrc": "DEAF40800153",
			"quantity": "2",
			"item_artist": "Elke Reichert"
		},
		{
			"royalty": ".021330",
			"item_title": "Keine Bleibende Stadt",
			"royaltyTotal": ".042660",
			"isrc": "DEAF40800154",
			"quantity": "2",
			"item_artist": "Lothar Kosse"
		},
		{
			"royalty": ".021330",
			"item_title": "Shalom Israel",
			"royaltyTotal": ".021330",
			"isrc": "DEAF40800155",
			"quantity": "1",
			"item_artist": "Martin Pepper"
		},
		{
			"royalty": ".021330",
			"item_title": "Wünscht Jerusalem Glück",
			"royaltyTotal": ".021330",
			"isrc": "DEAF40800156",
			"quantity": "1",
			"item_artist": "Elke Reichert"
		},
		{
			"royalty": ".021330",
			"item_title": "Jerusalem, Heilige Stadt",
			"royaltyTotal": ".021330",
			"isrc": "DEAF40800157",
			"quantity": "1",
			"item_artist": "Arne Kopfermann"
		},
		{
			"royalty": ".021330",
			"item_title": "Gott Israels",
			"royaltyTotal": ".042660",
			"isrc": "DEAF40800158",
			"quantity": "2",
			"item_artist": "Andrea Adams-Frey"
		},
		{
			"royalty": ".021330",
			"item_title": "Du Schöne",
			"royaltyTotal": ".021330",
			"isrc": "DEAF40800159",
			"quantity": "1",
			"item_artist": "Christoph Zehendner"
		},
		{
			"royalty": ".021330",
			"item_title": "Jeru-Salem",
			"royaltyTotal": ".021330",
			"isrc": "DEAF40800160",
			"quantity": "1",
			"item_artist": "Ina Morgan"
		},
		{
			"royalty": ".021330",
			"item_title": "Jerusalem, Jerusalem",
			"royaltyTotal": ".042660",
			"isrc": "DEAF40800161",
			"quantity": "2",
			"item_artist": "Danny Plett"
		},
		{
			"royalty": ".021330",
			"item_title": "Hatikwa",
			"royaltyTotal": ".021330",
			"isrc": "DEAF40800164",
			"quantity": "1",
			"item_artist": "Jochen Rieger"
		},
		{
			"royalty": ".021330",
			"item_title": "Hava Nagila",
			"royaltyTotal": ".298620",
			"isrc": "DEAF40800165",
			"quantity": "14",
			"item_artist": "Various Artists"
		},
		{
			"royalty": ".021330",
			"item_title": "Hinei Ma Tov",
			"royaltyTotal": ".021330",
			"isrc": "DEAF40800166",
			"quantity": "1",
			"item_artist": "Various Artists"
		},
		{
			"royalty": ".021330",
			"item_title": "Hevenu Shalom Alechem",
			"royaltyTotal": ".298620",
			"isrc": "DEAF40800167",
			"quantity": "14",
			"item_artist": "Tina Pantli; Ina Morgan; Sara Lorenz; Ingo Beckmann"
		},
		{
			"royalty": ".021330",
			"item_title": "Enforcement",
			"royaltyTotal": ".021330",
			"isrc": "DEW259300112",
			"quantity": "1",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "Recall",
			"royaltyTotal": ".021330",
			"isrc": "DEW259300114",
			"quantity": "1",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "Inversion",
			"royaltyTotal": ".021330",
			"isrc": "DEW259400124",
			"quantity": "1",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "Presence",
			"royaltyTotal": ".063990",
			"isrc": "DEW259400125",
			"quantity": "3",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "Lyot (Remix)",
			"royaltyTotal": ".021330",
			"isrc": "DEW259300118",
			"quantity": "1",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "Phylyps Trak II/I",
			"royaltyTotal": ".021330",
			"isrc": "DEW259400133",
			"quantity": "1",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "Phylyps Trak II/II",
			"royaltyTotal": ".021330",
			"isrc": "DEW259400134",
			"quantity": "1",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "That Certain Female",
			"royaltyTotal": ".021330",
			"isrc": "DEM070100235",
			"quantity": "1",
			"item_artist": "Charlie Feathers"
		},
		{
			"royalty": ".021330",
			"item_title": "Where Do You",
			"royaltyTotal": ".191970",
			"isrc": "DEH330601753",
			"quantity": "9",
			"item_artist": "Noise Boyz"
		},
		{
			"royalty": ".021330",
			"item_title": "Nervous Breakdown",
			"royaltyTotal": ".063990",
			"isrc": "FR2VZ9900153",
			"quantity": "3",
			"item_artist": "Suspect / Cleon"
		},
		{
			"royalty": ".021330",
			"item_title": "Bongodelik",
			"royaltyTotal": ".042660",
			"isrc": "FR2VZ9900154",
			"quantity": "2",
			"item_artist": "Suspect / Cleon"
		},
		{
			"royalty": ".021330",
			"item_title": "Chango 77",
			"royaltyTotal": ".042660",
			"isrc": "FR2VZ9900155",
			"quantity": "2",
			"item_artist": "Suspect / Cleon"
		},
		{
			"royalty": ".021330",
			"item_title": "Jeskilz...",
			"royaltyTotal": ".063990",
			"isrc": "FR2VZ9900156",
			"quantity": "3",
			"item_artist": "Suspect / Cleon"
		},
		{
			"royalty": ".021330",
			"item_title": "Green Season",
			"royaltyTotal": ".042660",
			"isrc": "FR2VZ9900157",
			"quantity": "2",
			"item_artist": "Suspect / Cleon"
		},
		{
			"royalty": ".021330",
			"item_title": "Melodik Hypnotik (Miles Dyson Mix)",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650803182",
			"quantity": "1",
			"item_artist": "Elite Force"
		},
		{
			"royalty": ".021330",
			"item_title": "Himininn Er Ao Hrynja, en Stjornurnar Fara Per Vel",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650805328",
			"quantity": "1",
			"item_artist": "Ólafur Arnalds"
		},
		{
			"royalty": ".021330",
			"item_title": "Walking On the Moon (Walking On the Dub)",
			"royaltyTotal": ".021330",
			"isrc": "DEH260806701",
			"quantity": "1",
			"item_artist": "DubXanne"
		},
		{
			"royalty": ".021330",
			"item_title": "Message In a Bottle (Message In a Dub) [feat. Earl 16]",
			"royaltyTotal": ".021330",
			"isrc": "DEH260806706",
			"quantity": "1",
			"item_artist": "DubXanne"
		},
		{
			"royalty": ".021330",
			"item_title": "Spirts In a Material World (Spirits In a Dubworld) [feat. Benjamin Zephaniah]",
			"royaltyTotal": ".021330",
			"isrc": "DEH260806708",
			"quantity": "1",
			"item_artist": "DubXanne"
		},
		{
			"royalty": ".021330",
			"item_title": "I'm a Manchild",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650713821",
			"quantity": "1",
			"item_artist": "Uptown Funk Empire"
		},
		{
			"royalty": ".021330",
			"item_title": "Phylyps Trak",
			"royaltyTotal": ".021330",
			"isrc": "DEW259300115",
			"quantity": "1",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "Phylyps Trak II/II",
			"royaltyTotal": ".021330",
			"isrc": "DEW259400134",
			"quantity": "1",
			"item_artist": "Basic Channel"
		},
		{
			"royalty": ".021330",
			"item_title": "De Plumber / Turn It Around",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807542",
			"quantity": "1",
			"item_artist": "Anderson Armstrong feat. Alison Hinds"
		},
		{
			"royalty": ".021330",
			"item_title": "Hold It Down (Get de Cat)",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807543",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Frenzy",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807544",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Represent",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807545",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Chipping",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807546",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Conscience Call",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807547",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Nutten So",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807548",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Ring Ki Ting",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807549",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Irie Tempo",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807550",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Ting Ting",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807551",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Leggo Beast",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807552",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Heavy Rollers",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807553",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Sweet (nutten So Remix)",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807554",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "Behind de Truck (chipping Version)",
			"royaltyTotal": ".021330",
			"isrc": "DEZ650807555",
			"quantity": "1",
			"item_artist": "Anderson Armstrong"
		},
		{
			"royalty": ".021330",
			"item_title": "No Heaven",
			"royaltyTotal": ".021330",
			"isrc": "CAL660400003",
			"quantity": "1",
			"item_artist": "Champion"
		},
		{
			"royalty": ".021330",
			"item_title": "Tawoumga",
			"royaltyTotal": ".021330",
			"isrc": "CAL660400008",
			"quantity": "1",
			"item_artist": "Champion"
		}
    ];