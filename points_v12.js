client.on("message", async msg => {
if(msg.author.bot || msg.channel.type === "dm") return undefined;
let args = msg.content.split(' '); 
if(args[0].toLowerCase() == `${prefix}point`) {
await db.fetch(`point_${msg.guild.id}_${msg.author.id}`)
if(!args[1]) {
let pp = db.fetchAll().valueOf(`point_${msg.guild.id}`, { sort: 'data'})
let content = "";
for(let i = 0; i < pp.length; i++) {
let user = client.users.cache.get(pp[i].ID.split('_')[2]).id
content += `**\`#${i+1}\` | <@${user}> > \`${pp[i].data}\` Points**\n`
}
if(pp === null) return undefined;
const embed = new Discord.MessageEmbed()
.setAuthor('Points:')
.setDescription(content)
.setColor("#36393e")
msg.channel.send(embed)
}
}
})
client.on("message", async msg => {
if(msg.author.bot || msg.channel.type === "dm") return undefined;
let args = msg.content.split(' '); 
if(args[0].toLowerCase() == `${prefix}point+`) {
let num = msg.content.split(" ")[2]
var ss = msg.mentions.users.first();
const err = new Discord.MessageEmbed()
.setDescription(`command: \`${prefix}point+ ${msg.author} 1\``)
.setColor("BLUE")
if(!num || !ss) return msg.channel.send(err)
await db.fetch(`pointuser_${msg.guild.id}_${ss.id}`)
msg.channel.send(`**✅ | Done**`);
db.add(`point_${msg.guild.id}_${ss.id}`, Number(num))
}
})
client.on("message", async msg => {
if(msg.author.bot || msg.channel.type === "dm") return undefined;
let args = msg.content.split(' '); 
if(args[0].toLowerCase() == `${prefix}point-`) {
let num = msg.content.split(" ")[2]
var ss = msg.mentions.users.first();
const err = new Discord.MessageEmbed()
.setDescription(`command: \`${prefix}point- ${msg.author} 1\``)
.setColor("BLUE")
if(!num || !ss) return msg.channel.send(err)
let ssad = await db.fetch(`pointuser_${msg.guild.id}_${ss.id}`)
if(ssad == 0) return msg.channel.send(`**❌ | Error**`);
msg.channel.send(`**✅ | Done**`);
db.subtract(`point_${msg.guild.id}_${ss.id}`, Number(num))
}
})
