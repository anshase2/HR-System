using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddMatchedSkillsAndRecommendationToCVAnalysis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ResumeText",
                table: "CVAnalysis",
                newName: "Recommendation");

            migrationBuilder.AddColumn<string>(
                name: "MatchedSkills",
                table: "CVAnalysis",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatchedSkills",
                table: "CVAnalysis");

            migrationBuilder.RenameColumn(
                name: "Recommendation",
                table: "CVAnalysis",
                newName: "ResumeText");
        }
    }
}
