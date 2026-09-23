export type Debug = {
  enabled: number;
};

export const create_debug = (): Debug => ({
  enabled: 0,
});
