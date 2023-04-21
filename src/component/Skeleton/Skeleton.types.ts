export type SkeletonProps = {
  children: JSX.Element;
  color?: string;
  animation?: 'wave' | 'pulse';
  duration?: number;
  dark?: boolean;
};

export type Unit = `${number}%` | number;

export type ShapeProps = Partial<{
  width: Unit;
  height: Unit;
  radius: number;
  size: number;
  ml: Unit;
  mr: Unit;
  mt: Unit;
  mb: Unit;
  mx: Unit;
  my: Unit;
  space: Unit;
  dark: boolean;
}>;

export type LayoutProps = {
  children: JSX.Element | JSX.Element[];
  center?: boolean;
  end?: boolean;
} & ShapeProps;
