// const membersJson = require("members.json")
const { readFile, writeFile } = require("node:fs/promises")
const path = require('node:path')

exports.addMembers = async function addMembers(guildMembers) {
  const filePath = path.join(__dirname, './members.json')
  const membersJson = await readFile(filePath, { encoding: 'utf-8' });
  let localStoredMembers = JSON.parse(membersJson);
  let localStoredMembersIDs = [];
  let guildMemberIDs = [];

  // Get IDs Only
  localStoredMembers.forEach(member => {
    localStoredMembersIDs.push(member.id);
  });
  guildMembers.forEach(member => {
    guildMemberIDs.push(member.user.id);
  });

  const filteredMembers = guildMemberIDs.filter(member => !localStoredMembersIDs.includes(member))
  const newLocalStoredMembers = []
  filteredMembers.forEach(memberID => {
    newLocalStoredMembers.push({
      "id": memberID,
      "nigs": 0
    })
  });

  const allMembers = localStoredMembers.concat(newLocalStoredMembers);
  await writeFile(filePath, JSON.stringify(allMembers))
}
