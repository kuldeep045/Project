import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
	{
		userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowerCase: true,
        },
        email: {
			type: String,
            required: true,
            unique: true,
            trim: true,
            lowerCase: true,
			index: true,
        },

		fullName: {
			type: String,
			required: true,
		},

		role: {
			type: String,
			enum: ['TALENT', 'EMPLOYER'],
		},

		profile: {
			type: String, //url
		},
		cover: {
			type: String, //url
		},

		password: {
			type: String,
			required: [true, 'Password is necessary'],
			minlength: 8,
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
