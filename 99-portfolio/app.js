import express from 'express';
import cors from 'cors';
import reviewsRouter from './be/reviews.js';
import fs from "fs";
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reviews', reviewsRouter);

const swaggerDocument = yaml.parse(fs.readFileSync('./spec/hotel-review.yaml', 'utf8'));
app.use('/spec', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/app', express.static('fe'));

app.listen(port, () => {
  console.log(`Server laeuft auf http://localhost:${port}`);
  console.log(`Frontend zu finden unter http://localhost:${port}/app`);
  console.log(`API-Spezifikation zu finden unter http://localhost:${port}/spec`);
  console.log(`Root-Pfad der API ist http://localhost:${port}/api`);
});
