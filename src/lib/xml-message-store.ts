import { promises as fs } from 'fs';
import path from 'path';

export interface ContactMessage {
  id: string;
  email: string;
  name: string;
  role: string;
  country: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const MESSAGES_FILE = path.join(MESSAGES_DIR, 'contact-messages.xml');

export class XMLMessageStore {
  private static async ensureDirectory() {
    try {
      await fs.access(MESSAGES_DIR);
    } catch {
      await fs.mkdir(MESSAGES_DIR, { recursive: true });
    }
  }

  private static async readMessagesFile(): Promise<string> {
    try {
      await this.ensureDirectory();
      return await fs.readFile(MESSAGES_FILE, 'utf-8');
    } catch {
      // Return empty XML structure if file doesn't exist
      return '<?xml version="1.0" encoding="UTF-8"?>\n<messages>\n</messages>';
    }
  }

  private static parseXML(xmlContent: string): ContactMessage[] {
    try {
      const messages: ContactMessage[] = [];

      // Extract all IDs first to determine how many messages there are
      const idRegex = /<id>([^<]+)<\/id>/g;
      const ids: string[] = [];
      let idMatch;
      while ((idMatch = idRegex.exec(xmlContent)) !== null) {
        ids.push(idMatch[1]);
      }

      // For each ID, extract the corresponding message data
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const messageStart = xmlContent.indexOf(`<id>${id}</id>`);
        const nextMessageStart = i < ids.length - 1 ? xmlContent.indexOf(`<id>${ids[i + 1]}</id>`) : xmlContent.indexOf('</messages>');

        if (messageStart === -1 || nextMessageStart === -1) {
          console.warn(`Could not find message boundaries for ID: ${id}`);
          continue;
        }

        const messageSection = xmlContent.substring(messageStart, nextMessageStart);

        const message: Partial<ContactMessage> = { id };

        // Extract other fields from this section
        const fieldPatterns = {
          email: /<email>([^<]+)<\/email>/,
          name: /<name>([^<]+)<\/name>/,
          role: /<role>([^<]+)<\/role>/,
          country: /<country>([^<]+)<\/country>/,
          phoneNumber: /<phoneNumber>([^<]+)<\/phoneNumber>/,
          message: /<message>([\s\S]*?)<\/message>/,
          createdAt: /<createdAt>([^<]*?)<\/createdAt>/
        };

        for (const [field, pattern] of Object.entries(fieldPatterns)) {
          const match = messageSection.match(pattern);
          (message as Record<string, string>)[field] = match ? match[1] : '';
        }

        messages.push(message as ContactMessage);
      }

      return messages;
    } catch (error) {
      console.error("XMLMessageStore parseXML error:", error);
      // Return empty array if parsing fails
      return [];
    }
  }

  private static generateXML(messages: ContactMessage[]): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<messages>\n';
    const xmlFooter = '</messages>';

    const messageXML = messages.map(msg => {
      return `  <message>
    <id>${this.escapeXML(msg.id)}</id>
    <email>${this.escapeXML(msg.email)}</email>
    <name>${this.escapeXML(msg.name)}</name>
    <role>${this.escapeXML(msg.role)}</role>
    <country>${this.escapeXML(msg.country)}</country>
    <phoneNumber>${this.escapeXML(msg.phoneNumber)}</phoneNumber>
    <message>${this.escapeXML(msg.message)}</message>
    <createdAt>${this.escapeXML(msg.createdAt)}</createdAt>
  </message>`;
    }).join('\n');

    return xmlHeader + messageXML + '\n' + xmlFooter;
  }

  private static escapeXML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  static async saveMessage(messageData: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> {
    try {
      console.log("XMLMessageStore: Ensuring directory...");
      await this.ensureDirectory();

      console.log("XMLMessageStore: Reading messages file...");
      const xmlContent = await this.readMessagesFile();
      console.log("XMLMessageStore: XML content length:", xmlContent.length);

      console.log("XMLMessageStore: Parsing XML...");
      const messages = this.parseXML(xmlContent);
      console.log("XMLMessageStore: Parsed messages count:", messages.length);

      const newMessage: ContactMessage = {
        ...messageData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };
      console.log("XMLMessageStore: Created new message:", newMessage.id);

      messages.unshift(newMessage); // Add to beginning for latest first

      console.log("XMLMessageStore: Generating XML...");
      const newXMLContent = this.generateXML(messages);
      console.log("XMLMessageStore: New XML length:", newXMLContent.length);

      console.log("XMLMessageStore: Writing file...");
      await fs.writeFile(MESSAGES_FILE, newXMLContent, 'utf-8');
      console.log("XMLMessageStore: File written successfully");

      return newMessage;
    } catch (error) {
      console.error("XMLMessageStore saveMessage error:", error);
      console.error("Error stack:", error.stack);
      throw new Error(`Failed to save message: ${error.message}`);
    }
  }

  static async getMessages(page: number = 1, pageSize: number = 20): Promise<{
    messages: ContactMessage[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalMessages: number;
      totalPages: number;
    };
  }> {
    const xmlContent = await this.readMessagesFile();
    const allMessages = this.parseXML(xmlContent);

    const totalMessages = allMessages.length;
    const totalPages = Math.ceil(totalMessages / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const messages = allMessages.slice(startIndex, endIndex);

    return {
      messages,
      pagination: {
        currentPage: page,
        pageSize,
        totalMessages,
        totalPages,
      },
    };
  }

  static async deleteMessage(id: string): Promise<boolean> {
    const xmlContent = await this.readMessagesFile();
    const messages = this.parseXML(xmlContent);

    const filteredMessages = messages.filter(msg => msg.id !== id);

    if (filteredMessages.length === messages.length) {
      return false; // Message not found
    }

    const newXMLContent = this.generateXML(filteredMessages);
    await fs.writeFile(MESSAGES_FILE, newXMLContent, 'utf-8');

    return true;
  }

  static async getRawXML(): Promise<string> {
    return await this.readMessagesFile();
  }
}