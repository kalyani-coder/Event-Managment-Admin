const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  accountHolderName: { type: String,  },
  accountNumber: { type: String,  },
  accountantAddress: { type: String,  },
  accountantCity: { type: String,  },
  accountantEmail: { type: String,  },
  accountantPhone: { type: String,  },
  accountantState: { type: String,  },
  bankName: { type: String,  },
  branchName: { type: String,  },
  firstName: { type: String,  },
  ifscCode: { type: String,  },
  lastName: { type: String,  },
  profilePicture: { type: String,  },
});

module.exports = mongoose.model("Accountants", Schema);
