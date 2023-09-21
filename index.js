// Importing stuff
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');

// Defines client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers,
    ]
})

// Load the commands
console.log("[STARTUP] Loading commands")
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[COMMANDS] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
	console.log("[STARTUP] Finished loading commands")
}

// Adds the message to the log when the bot starts
client.on ('ready', () => {
    console.log('[STARTUP] The bot is on!')
})

// Get any message
 client.on('messageCreate', message => {
 	if (message.author.bot) {
         return;
     }
	 // Check if it's something you want to reply and replies
     if (message.content.toLowerCase().includes('theFirstWord') || message.content.toLowerCase().includes('theSecondWord') && message.content.toLowerCase().includes('fofa')) {
         message.reply('^v-v^');
     }



// Get slash command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	// Command = command name
	const command = interaction.client.commands.get(interaction.commandName);

    // If there's no command matching the user input log an error
	if (!command) {
		console.error(`[ERR] No command matching ${interaction.commandName} was found.`);
		return;
	}

    // Try to execute the given command
try {
    await command.execute(interaction);
} catch (error) {
    console.error(error);
}
});

// Automatically changes the activity to something you want
const activities_list = [
	// The song list (you can delete this and change to anything you want
    "Blackout by Breathe Carolina", 
    "I.D.G.A.F by Breathe Carolina",
    "MTC by S3RL", 
    "Pika Girl by S3RL",
	"Everytime We Touch by Cascada",
	"Because The Night by Cascada",
	"Bad Boy by Cascada",
	"Chemical by Breathe Carolina",
	"União Flasco by Luckhaos",
	"Polaroid by YunLi",
	"Wooly by Breathe Carolina",
	"That's Classy by Breathe Carolina",
	"O Funeral Da Irônia by Luckhaos",
	"Sakura by YunLi",
	"Será by YunLi",
	"Pudim Amassado by Gato Galáctico",
	"Quem Quer Subir by MC V.V",
	"The Pretender by Foo Fighters",
	"WIFI by Breathe Carolina",
	"With or Without You by Breathe Carolina",
	"With or Without You by U2",
	"Good Feeling by Flo Rida",
	"Walking With Angels by The Autobiography",
	"Coca Zero by YunLi",
	"We're All The Pirate Bay (Hybrid Remix) by Montt Mardie",
	"How Do You Do by Boom",
	"Dog Nightmare by Jack Stauber",
	"Buttercup bu Jack Stauber",
	"Baby Hotline by Jack Stauber",
	"To Your Beat by S3RL",
	"Better Off Alone by S3RL",
	"Make Me Wanna by S3RL", // 1
	"L'amour Toujour by Gigi D'agostino",
	"C'est Beau La Bourgueoise by Discobitch",
	"Bla Bla Bla by Gigi D'agostino",
	"Discord by The Living Tombstones",
	"Eu não faço sad songs, faço desabafos by D$ Luqi",
	"Lucid Dreams by Juice WRLD",
	"Moonlight by XXXTentacion",
	"Falling Down (Feat. XXXTentacion) by Lil Peep",
	"Save This by Lil Peep",
	"I Wonder by Kayne West",
	"All The Girls Are The Same by Juice WRLD",
	"Wishing Well by Juice World",
	"Legends Never Die by League Of Legends",
	"Phoenix by League Of Legends",
	"Let Me Die by Lil Happy Lil Sad",
	"She Was My Universe by DempseyRollBoy",
	"In My Bones by Sadgods",
	"Call Me Maybe by Carly Rae Jespen",
	"Maps by Maroon 5",
	"Memories by Maroon 5",
	"I Don't Wanna Know by Maroon 5",
	"Sugar by Maroon 5",
	"Girls Like You by Maroon 5",
	"Misery by Maroon 5",
	"This Love by Maroon 5",
	"One More Night by Maroon 5",
	"She Will Be Loved by Maroon 5",
	"Moves Like Jagger by Maroon 5",
	"Animals by Maroon 5",
	"One & Only by Oliver Tree",
	"Miss You by Oliver Tree",
	"Thnks Fr Th Mmrs by Fall Out Boy",
	"Centuries by Fall Out Boy",
	"Valsa by YunLi",
	"Glória Aos Avestruzes by Amdré Young",
	"Sono Que Eu Perdi (Demo) by YunLi",
	"Acabou by YunLi",
	"Saudades Eu Até Sinto (Demo) by YunLi",
	"Dói Demais (Demo) by YunLi",
	"Playback (Demo) by YunLi",
	"Lista De Favoritos (Demo) by YunLi",
	"Sprinter Trueno by YunLi",
    ];

client.on('ready', () => {
	// Sets the first status
	console.log("[STARTUP] Setting up statuses")
	const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // // Random number between 1 and the length of the array .
	client.user.setActivity(activities_list[index], { type: ActivityType.Listening }); // sets bot's activities to one of the phrases in the arraylist.
    console.log("[STARTUP] Setting the first random status")
	// Changes the status after some time
	setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // Random number between 1 and the length of the array .
        client.user.setActivity(activities_list[index], { type: ActivityType.Listening }); // Set the activity from the random number, you can isolate this to change to anything you want
		// Change type to any other ActivityType you want
		// Log the change
		console.log("[LOG] Changing activity")
	}, 200000);
});

// Log the bot in (put your token on config.js if you`re getting any error
client.config = require('./config');
client.login(client.config.token);