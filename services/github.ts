
export const simulateGitHubLink = async (): Promise<string> => {
  // Simulating an OAuth redirect and handshake
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("github_user_4029");
    }, 2000);
  });
};

export const syncToGitHub = async (data: any[]): Promise<boolean> => {
  // Simulating pushing data to a 'allan-connect-backup' repository
  console.log("Pushing to GitHub:", data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};
