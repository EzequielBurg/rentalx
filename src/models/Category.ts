import { v4 as uuid } from "uuid";

export class Category {
  id: string;
  name: string;
  description: string;
  created_at: Date;

  constructor(name: string, description: string) {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }

    this.name = name;
    this.description = description;
  }
}
