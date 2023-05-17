export default interface Seeder {
  init(): Promise<void>;
  run(): Promise<void>;
  close(): Promise<void>;
}
