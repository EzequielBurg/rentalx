import csvParse from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategories[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", async () => {
          await fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", async (err) => {
          await fs.promises.unlink(file.path);
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    let repeatedCategory = 0;

    categories.forEach((category) => {
      const { name } = category;
      const categoryAlreadyExists = this.categoriesRepository.findByName(name);

      if (categoryAlreadyExists) {
        repeatedCategory++;
      } else {
        this.categoriesRepository.create(category);
      }
    });

    if (repeatedCategory > 0) {
      throw new Error(`Your file has ${repeatedCategory} invalid lines!`);
    }
  }
}
