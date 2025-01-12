// Helper
const ResponseBulider = require('../helpers/responseBuilder');

// Message Media
const { MessageMedia } = require('whatsapp-web.js');
class MessageGroupController{

    // Get Group Chat
    getGroupChat = async (req, res) => {
        try{
            const { group_name, message} = req.body;
            const client = req.data_client;
        }catch(error){
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }

    // Sending Group Chat
    groupChat = async (req, res) => {
        try {
            const { group_name, message} = req.body;
            const client = req.data_client;

            // Getting chat
            await client.getChats().then(async (chats) => {
                const grup = chats.find((chat) => chat.name === group_name);

                // Sending Message
                console.log(message);
                const pesan = await grup.sendMessage(message)
                return ResponseBulider.success(res, pesan);

            });

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }

    // Updating group
    udpateGroupDescription = async (req, res) => {
        try {
            const { group_name, description} = req.body;
            const client = req.data_client;

            // Checking Description
            if(!description){
                return ResponseBulider.error(res, 422, 'Description is needed');   
            }

            // Getting chat
            await client.getChats().then(async (chats) => {
                const grup = chats.find((chat) => chat.name === group_name);

                // Sending Message
                const nesDescription = await grup.setDescription(description)
                return ResponseBulider.success(res, nesDescription);

            });

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }

}

module.exports = MessageGroupController