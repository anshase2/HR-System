using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserFromApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applicants_AspNetUsers_UserId",
                table: "Applicants");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Applicants_ApplicantId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_AspNetUsers_CreatedById",
                table: "Jobs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CVanalysis",
                table: "CVanalysis");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Applications");

            migrationBuilder.RenameTable(
                name: "CVanalysis",
                newName: "CVAnalysis");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CVAnalysis",
                table: "CVAnalysis",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CVAnalysis_ApplicationId",
                table: "CVAnalysis",
                column: "ApplicationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_JobId",
                table: "Applications",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applicants_AspNetUsers_UserId",
                table: "Applicants",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Applicants_ApplicantId",
                table: "Applications",
                column: "ApplicantId",
                principalTable: "Applicants",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Jobs_JobId",
                table: "Applications",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CVAnalysis_Applications_ApplicationId",
                table: "CVAnalysis",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_AspNetUsers_CreatedById",
                table: "Jobs",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applicants_AspNetUsers_UserId",
                table: "Applicants");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Applicants_ApplicantId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Jobs_JobId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_CVAnalysis_Applications_ApplicationId",
                table: "CVAnalysis");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_AspNetUsers_CreatedById",
                table: "Jobs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CVAnalysis",
                table: "CVAnalysis");

            migrationBuilder.DropIndex(
                name: "IX_CVAnalysis_ApplicationId",
                table: "CVAnalysis");

            migrationBuilder.DropIndex(
                name: "IX_Applications_JobId",
                table: "Applications");

            migrationBuilder.RenameTable(
                name: "CVAnalysis",
                newName: "CVanalysis");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CVanalysis",
                table: "CVanalysis",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Applicants_AspNetUsers_UserId",
                table: "Applicants",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Applicants_ApplicantId",
                table: "Applications",
                column: "ApplicantId",
                principalTable: "Applicants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_AspNetUsers_CreatedById",
                table: "Jobs",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
