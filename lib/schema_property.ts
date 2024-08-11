export interface SchemaProperty {
  type?: StringConstructor | NumberConstructor;
  required?: boolean;
  unique?: boolean;
}
