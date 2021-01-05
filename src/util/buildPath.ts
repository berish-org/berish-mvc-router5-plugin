export function buildPath(params: { [key: string]: any }) {
  const keyBuild = (key: string, value: any): { [key: string]: any } => {
    if (!value && typeof value !== "boolean" && typeof value !== "number")
      return { [key]: null };
    if (
      typeof value === "number" ||
      typeof value === "string" ||
      typeof value === "boolean"
    )
      return { [key]: value.toString() };
    if (Array.isArray(value)) {
      if (value.length === 0) return { [key]: "[]" };
      return value
        .map((m, i) => keyBuild(key + "." + i, m))
        .filter((m) => !!m)
        .reduce((out, build) => ({ ...out, ...build }), {});
    }
    if (
      typeof value === "object" &&
      value === Object(value) &&
      Object.prototype.toString.call(value) !== "[object Array]"
    )
      return Object.keys(value)
        .map((m) => keyBuild(key ? key + "." + m : m, value[m]))
        .filter((m) => !!m)
        .reduce((out, build) => ({ ...out, ...build }), {});
    return null;
  };
  return keyBuild(null, params);
}
