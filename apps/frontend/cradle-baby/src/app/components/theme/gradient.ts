export const scales = (
  primary: string,
  secondary: string
) => `radial-gradient(circle at 100% 150%, ${primary} 24%, ${secondary} 24%, ${secondary} 28%, ${primary} 28%, ${primary} 36%, ${secondary} 36%, ${secondary} 40%, transparent 40%, transparent),
radial-gradient(circle at 0    150%, ${primary} 24%, ${secondary} 24%, ${secondary} 28%, ${primary} 28%, ${primary} 36%, ${secondary} 36%, ${secondary} 40%, transparent 40%, transparent),
radial-gradient(circle at 50%  100%, ${secondary} 10%, ${primary} 10%, ${primary} 23%, ${secondary} 23%, ${secondary} 30%, ${primary} 30%, ${primary} 43%, ${secondary} 43%, ${secondary} 50%, ${primary} 50%, ${primary} 63%, ${secondary} 63%, ${secondary} 71%, transparent 71%, transparent),
radial-gradient(circle at 100% 50%, ${secondary} 5%, ${primary} 5%, ${primary} 15%, ${secondary} 15%, ${secondary} 20%, ${primary} 20%, ${primary} 29%, ${secondary} 29%, ${secondary} 34%, ${primary} 34%, ${primary} 44%, ${secondary} 44%, ${secondary} 49%, transparent 49%, transparent),
radial-gradient(circle at 0    50%, ${secondary} 5%, ${primary} 5%, ${primary} 15%, ${secondary} 15%, ${secondary} 20%, ${primary} 20%, ${primary} 29%, ${secondary} 29%, ${secondary} 34%, ${primary} 34%, ${primary} 44%, ${secondary} 44%, ${secondary} 49%, transparent 49%, transparent)`;
